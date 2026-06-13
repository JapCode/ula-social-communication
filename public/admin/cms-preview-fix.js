/**
 * cms-preview-fix.js — Decap CMS Custom Preview for draft images
 *
 * Problem: Dragging images into the markdown body creates "draft" (pending)
 * media files that aren't uploaded until the entry is saved. In the preview
 * pane, these images show as broken because the path does not exist yet.
 *
 * Fix: Register a custom preview template that:
 *   1. Renders all entry fields using their default widget previews
 *      (via widgetFor), preserving the CMS's native look.
 *   2. After mount and on each update, scans every <img> and resolves
 *      its src using getAsset(). For draft images, getAsset returns a
 *      blob: URL from the in-memory File object, making it visible.
 *   3. Marks fixed images with data-cms-fixed to avoid re-processing.
 *
 * WARNING: Decap CMS puts `createClass` and `h` (React.createElement)
 *          on the GLOBAL `window` object, NOT on `window.CMS`.
 *          So use `window.h()` and `window.createClass()`, NOT `window.CMS.h()`.
 */
(function () {
  'use strict';

  if (!window.CMS) {
    console.warn('[CMS Fix] window.CMS not available — script skipped');
    return;
  }

  // Decap CMS exposes window.h = React.createElement and window.createClass
  // at script init time. Verify they're available.
  var h = window.h;
  var createClass = window.createClass;

  if (typeof h !== 'function') {
    console.warn('[CMS Fix] window.h (React.createElement) not found — script skipped');
    return;
  }
  if (typeof createClass !== 'function') {
    console.warn('[CMS Fix] window.createClass not found — script skipped');
    return;
  }

  console.log('[CMS Fix] Script loaded, h=React.createElement ✓, createClass ✓');

  // Fields to exclude from preview (system/internal fields)
  var EXCLUDE_FIELDS = ['layout', 'draft', 'type'];

  /**
   * Custom preview React component.
   * Uses createClass (create-react-class polyfill) for Decap CMS compatibility.
   */
  var PreviewWithAssetFix = createClass({
    render: function () {
      var self = this;
      var entry = this.props.entry;
      var widgetFor = this.props.widgetFor;

      if (!entry) return null;

      var data = entry.get('data');
      if (!data) {
        return h('div', { className: 'nc-loading' }, 'Cargando…');
      }

      // Collect field names from the entry data (order-preserving)
      var fieldNames = [];
      data.forEach(function (value, key) {
        if (EXCLUDE_FIELDS.indexOf(key) === -1) {
          fieldNames.push(key);
        }
      });

      console.log('[CMS Fix] Rendering preview with fields:', fieldNames);

      // Render each field with its default widget preview
      // widgetFor returns null for unknown fields — filter those out
      var children = fieldNames
        .map(function (name) {
          var widget = widgetFor(name);
          if (widget == null) return null; // null or undefined
          return h('div', {
            key: name,
            className: 'cms-field cms-field--' + name,
          }, widget);
        })
        .filter(function (child) { return child !== null; });

      return h('div', {
        ref: function (el) { self._root = el; },
        className: 'cms-preview-container',
      }, children);
    },

    componentDidMount: function () {
      console.log('[CMS Fix] Preview component mounted');
      this.resolveImages();
    },

    componentDidUpdate: function () {
      console.log('[CMS Fix] Preview component updated');
      this.resolveImages();
    },

    /**
     * Scan the rendered preview and fix any unresolved image src attributes.
     * Uses getAsset() to resolve paths — returns blob URLs for draft images,
     * unchanged paths for already-uploaded images.
     */
    resolveImages: function () {
      if (!this._root) return;

      var getAsset = this.props.getAsset;
      if (typeof getAsset !== 'function') {
        console.warn('[CMS Fix] getAsset is not a function');
        return;
      }

      var imgs = this._root.querySelectorAll('img:not([data-cms-fixed])');
      console.log('[CMS Fix] Found', imgs.length, 'unresolved images');

      for (var i = 0; i < imgs.length; i++) {
        this._resolveImage(imgs[i], getAsset);
      }
    },

    /**
     * Resolve a single <img> element's src via getAsset.
     */
    _resolveImage: function (img, getAsset) {
      var src = img.getAttribute('src');

      // Already resolved (blob/data URL) — skip and mark done
      if (!src) {
        img.setAttribute('data-cms-fixed', 'true');
        return;
      }

      if (src.startsWith('blob:') || src.startsWith('data:')) {
        console.log('[CMS Fix] Image already resolved:', src.substring(0, 40) + '…');
        img.setAttribute('data-cms-fixed', 'true');
        return;
      }

      console.log('[CMS Fix] Resolving image src:', src);

      try {
        var resolved = getAsset(src);
        console.log('[CMS Fix] getAsset returned:', resolved, typeof resolved);
        if (resolved && typeof resolved === 'string' && resolved !== src) {
          img.setAttribute('src', resolved);
          console.log('[CMS Fix] ✓ Image resolved:', src, '→', resolved.substring(0, 40) + '…');
        } else if (resolved === src) {
          console.log('[CMS Fix] getAsset returned same path (not a draft image or not found)');
        } else {
          console.log('[CMS Fix] getAsset returned unexpected value:', resolved);
        }
      } catch (e) {
        console.warn('[CMS Fix] getAsset error for "' + src + '":', e);
      }

      img.setAttribute('data-cms-fixed', 'true');
    },
  });

  // Register for every collection that has a markdown body (inline images)
  var TARGET_COLLECTIONS = ['articles', 'events'];

  console.log('[CMS Fix] Registering preview templates for:', TARGET_COLLECTIONS);

  TARGET_COLLECTIONS.forEach(function (name) {
    try {
      window.CMS.registerPreviewTemplate(name, PreviewWithAssetFix);
      console.log('[CMS Fix] ✓ Preview template registered for "' + name + '"');
    } catch (e) {
      console.warn('[CMS Fix] ✗ Failed to register preview for "' + name + '":', e.message);
    }
  });
})();
