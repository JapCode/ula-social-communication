(function () {
  'use strict';

  if (!window.CMS || typeof window.h !== 'function' || typeof window.createClass !== 'function') return;

  var h = window.h;
  var createClass = window.createClass;

  var TARGET_COLLECTIONS = ['articles', 'events'];

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

        // Strategy: direct mediaFiles lookup → blob URL
        if (mediaFiles && mediaFiles.length) {
          var srcName = src.split('/').pop();
          for (var j = 0; j < mediaFiles.length; j++) {
            var mf = mediaFiles[j];
            if (mf.fileObj && (mf.path === src || mf.name === srcName || (mf.path && mf.path.endsWith(srcName)))) {
              img.setAttribute('src', URL.createObjectURL(mf.fileObj));
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
