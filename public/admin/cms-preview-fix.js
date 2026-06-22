(function () {
  'use strict';

  if (!window.CMS || typeof window.h !== 'function' || typeof window.createClass !== 'function') return;

  var h = window.h;
  var createClass = window.createClass;

  var TARGET_COLLECTIONS = [
    'articles', 'events', 'faculty', 'staff', 'testimonials',
    'page-home', 'page-contact', 'page-history', 'page-graduate-profile',
    'page-internships', 'page-association', 'page-groups', 'page-community',
    'page-admission-process', 'page-admission-requirements',
    'page-alumni-testimonials', 'page-alumni-continuing-education',
    'page-events-listing', 'page-curriculum', 'page-course-content', 'page-mission'
  ];

  /**
   * Custom preview that renders all fields with widgetFor(),
   * then resolves draft images via direct mediaFiles lookup.
   */
  var PreviewFix = createClass({
    render: function () {
      var self = this;
      var entry = this.props.entry;
      var widgetFor = this.props.widgetFor;
      if (!entry) return null;

      var data = entry.get('data');
      if (!data) return h('div', { className: 'nc-loading' }, 'Cargando…');

      var children = [];
      data.forEach(function (value, key) {
        if (key === 'layout' || key === 'draft' || key === 'type') return;
        var widget = widgetFor(key);
        if (widget != null) {
          children.push(h('div', { key: key, className: 'cms-field--' + key }, widget));
        }
      });

      return h('div', { ref: function (el) { self._root = el; } }, children);
    },

    componentDidMount: function () { this.resolve(); },
    componentDidUpdate: function () { this.resolve(); },

    resolve: function () {
      if (!this._root) return;
      var getAsset = this.props.getAsset;
      var entry = this.props.entry;
      var mediaFiles = entry ? entry.get('mediaFiles') : null;

      var imgs = this._root.querySelectorAll('img:not([data-cms-fixed])');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var src = img.getAttribute('src');
        img.setAttribute('data-cms-fixed', 'true');

        if (!src || src.startsWith('blob:') || src.startsWith('data:')) continue;

        var resolved = false;

        // Strategy 1: getAsset — resolves committed images, gives absolute URL
        if (typeof getAsset === 'function') {
          try {
            var asset = getAsset(src);
            if (asset && asset.url) {
              if (asset.url !== src) {
                img.setAttribute('src', asset.url);
                resolved = true;
              }
            }
          } catch (e) {}
        }

        // Strategy 2: mediaFiles lookup — resolves draft images via blob URL
        if (!resolved && mediaFiles && mediaFiles.length) {
          var srcName = src.split('/').pop();
          for (var j = 0; j < mediaFiles.length; j++) {
            var mf = mediaFiles[j];
            if (mf.fileObj && (mf.path === src || mf.name === srcName || (mf.path && mf.path.endsWith(srcName)))) {
              img.setAttribute('src', URL.createObjectURL(mf.fileObj));
              resolved = true;
              break;
            }
          }
        }
      }
    }
  });

  TARGET_COLLECTIONS.forEach(function (name) {
    try { window.CMS.registerPreviewTemplate(name, PreviewFix); } catch (e) {}
  });
})();
