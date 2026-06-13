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
      var getAsset = this.props.getAsset;

      if (!entry) return null;

      var data = entry.get('data');
      if (!data) {
        return h('div', { className: 'nc-loading' }, 'Cargando…');
      }

      // DIAGNOSTIC: Log entry mediaFiles details
      try {
        var mediaFiles = entry.get('mediaFiles');
        if (mediaFiles && mediaFiles.length > 0) {
          console.log('[CMS Fix] Entry mediaFiles count:', mediaFiles.length);
          // Log paths of first few to see format
          for (var mi = 0; mi < Math.min(mediaFiles.length, 5); mi++) {
            var mf = mediaFiles[mi];
            console.log('[CMS Fix] mediaFile[' + mi + ']:', {
              path: mf.path,
              name: mf.name,
              hasFileObj: !!mf.fileObj,
              fileObjType: mf.fileObj ? mf.fileObj.constructor.name : null,
              url: mf.url,
            });
          }
        } else if (mediaFiles) {
          console.log('[CMS Fix] Entry mediaFiles (empty):', mediaFiles);
        } else {
          console.log('[CMS Fix] Entry mediaFiles: none');
        }
      } catch (e) {
        console.log('[CMS Fix] Could not access mediaFiles:', e.message);
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
     */
    resolveImages: function () {
      if (!this._root) return;

      var getAsset = this.props.getAsset;
      var entry = this.props.entry;

      var imgs = this._root.querySelectorAll('img:not([data-cms-fixed])');
      console.log('[CMS Fix] Found', imgs.length, 'unresolved images');

      for (var i = 0; i < imgs.length; i++) {
        this._resolveImage(imgs[i], getAsset, entry);
      }
    },

    /**
     * Resolve a single <img> element's src.
     *
     * Tries two strategies:
     *   1. getAsset(path) — Decap CMS's built-in resolver (returns Aa object)
     *   2. Direct mediaFiles lookup — create blob: URL from fileObj if path matches
     */
    _resolveImage: function (img, getAsset, entry) {
      var src = img.getAttribute('src');

      if (!src) {
        img.setAttribute('data-cms-fixed', 'true');
        return;
      }

      if (src.startsWith('blob:') || src.startsWith('data:')) {
        console.log('[CMS Fix] Image already resolved:', src.substring(0, 50) + '…');
        img.setAttribute('data-cms-fixed', 'true');
        return;
      }

      console.log('[CMS Fix] Resolving image src:', src);

      // Strategy 1: Try getAsset
      var resolvedViaAsset = false;
      if (typeof getAsset === 'function') {
        try {
          var resolved = getAsset(src);
          if (resolved && typeof resolved === 'object' && resolved.url) {
            if (resolved.fileObj) {
              console.log('[CMS Fix] ✓ getAsset found DRAFT image, url:', resolved.url.substring(0, 60) + '…');
              img.setAttribute('src', resolved.url);
              resolvedViaAsset = true;
            } else if (resolved.url !== src) {
              console.log('[CMS Fix] getAsset returned different url:', resolved.url);
              img.setAttribute('src', resolved.url);
              resolvedViaAsset = true;
            }
          } else if (typeof resolved === 'string' && resolved !== src) {
            img.setAttribute('src', resolved);
            resolvedViaAsset = true;
          }
        } catch (e) {
          console.warn('[CMS Fix] getAsset error:', e);
        }
      }

      // Strategy 2: Direct mediaFiles lookup
      if (!resolvedViaAsset && entry) {
        try {
          var mediaFiles = entry.get('mediaFiles');
          if (mediaFiles && mediaFiles.length > 0) {
            for (var mi = 0; mi < mediaFiles.length; mi++) {
              var mf = mediaFiles[mi];
              // Try matching by path, name, or if src ends with the filename
              var srcName = src.split('/').pop();
              var matches = (mf.path === src) ||
                (mf.name === srcName) ||
                (mf.path && mf.path.endsWith(srcName));
              if (matches && mf.fileObj) {
                var blobUrl = URL.createObjectURL(mf.fileObj);
                console.log('[CMS Fix] ✓ Direct mediaFiles match for "' + srcName + '", created blob:', blobUrl.substring(0, 60) + '…');
                img.setAttribute('src', blobUrl);
                resolvedViaAsset = true;
                break;
              }
            }
            if (!resolvedViaAsset) {
              console.log('[CMS Fix] mediaFiles searched, no matching draft found for:', src);
            }
          }
        } catch (e) {
          console.warn('[CMS Fix] mediaFiles lookup error:', e);
        }
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
