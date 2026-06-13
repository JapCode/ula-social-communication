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
 */
(function () {
  'use strict';

  if (!window.CMS) {
    console.warn('[CMS Fix] window.CMS not available — script skipped');
    return;
  }

  // Fields to exclude from preview (system/internal fields)
  var EXCLUDE_FIELDS = ['layout', 'draft', 'type'];

  /**
   * Custom preview React component.
   * Compatible with Decap CMS 3.x (uses createClass, not ES6 class).
   */
  var PreviewWithAssetFix = window.CMS.createClass({
    render: function () {
      var self = this;
      var entry = this.props.entry;
      var widgetFor = this.props.widgetFor;

      if (!entry) return null;

      var data = entry.get('data');
      if (!data) {
        return window.CMS.h('div', { className: 'nc-loading' }, 'Cargando…');
      }

      // Collect field names from the entry data (order-preserving)
      var fieldNames = [];
      data.forEach(function (value, key) {
        if (EXCLUDE_FIELDS.indexOf(key) === -1) {
          fieldNames.push(key);
        }
      });

      // Render each field with its default widget preview
      // widgetFor returns null for unknown fields — filter those out
      var children = fieldNames
        .map(function (name) {
          var widget = widgetFor(name);
          if (widget == null) return null; // null or undefined
          return window.CMS.h('div', {
            key: name,
            className: 'cms-field cms-field--' + name,
          }, widget);
        })
        .filter(function (child) { return child !== null; });

      return window.CMS.h('div', {
        ref: function (el) { self._root = el; },
        className: 'cms-preview-container',
      }, children);
    },

    componentDidMount: function () {
      this.resolveImages();
    },

    componentDidUpdate: function () {
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
      if (typeof getAsset !== 'function') return;

      var imgs = this._root.querySelectorAll('img:not([data-cms-fixed])');
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
      if (!src || src.startsWith('blob:') || src.startsWith('data:')) {
        img.setAttribute('data-cms-fixed', 'true');
        return;
      }

      try {
        var resolved = getAsset(src);
        if (resolved && typeof resolved === 'string' && resolved !== src) {
          img.setAttribute('src', resolved);
        }
      } catch (e) {
        console.warn('[CMS Fix] getAsset error for "' + src + '":', e);
      }

      img.setAttribute('data-cms-fixed', 'true');
    },
  });

  // Register for every collection that has a markdown body (inline images)
  var TARGET_COLLECTIONS = ['articles', 'events'];

  TARGET_COLLECTIONS.forEach(function (name) {
    try {
      window.CMS.registerPreviewTemplate(name, PreviewWithAssetFix);
      console.log('[CMS Fix] Custom preview registered for "' + name + '"');
    } catch (e) {
      console.warn('[CMS Fix] Failed to register preview for "' + name + '":', e.message);
    }
  });
})();
