import React from 'react';

/**
 * UI-only field that shows a link to the Staff collection in Tina admin.
 * Doesn't store data — just navigation from the page editor.
 */
export const StaffCollectionLink = () => {
  return (
    <div style={{ padding: '0.5rem 0' }}>
      <a
        href="#/collections/staff"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          background: 'rgba(0, 93, 170, 0.06)',
          color: '#005daa',
          fontWeight: 600,
          fontSize: '0.875rem',
          textDecoration: 'none',
          transition: 'background 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0, 93, 170, 0.12)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(0, 93, 170, 0.06)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Editar en colección Staff
      </a>
    </div>
  );
};
