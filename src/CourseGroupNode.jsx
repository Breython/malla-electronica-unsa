// src/CourseGroupNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CourseGroupNode({ data }) {
  const isFocused = data.isFocused;
  const isBlocked = data.isBlocked;
  const isPrereq = data.isPrereq; 
  const isDimmed = data.isDimmed;

  let borderColor = '#94a3b8'; 
  let bgColor = '#ffffff';
  let opacity = isDimmed ? 0.2 : 1; 

  if (isFocused) {
    borderColor = '#b8860b'; // Dorado
    bgColor = '#fffbd1'; 
    opacity = 1;
  } else if (isBlocked) {
    borderColor = '#ef4444'; // Rojo (lo que se retrasa)
    bgColor = '#fee2e2'; 
    opacity = 1;
  } else if (isPrereq) {
    borderColor = '#3b82f6'; // Azul (lo que necesitas aprobar antes)
    bgColor = '#eff6ff';
    opacity = 1;
  }

  return (
    <div style={{
      width: '260px',
      border: `2px solid ${borderColor}`,
      borderRadius: '8px',
      backgroundColor: bgColor,
      boxShadow: (isFocused || isBlocked || isPrereq) ? '0 4px 6px -1px rgba(0, 0, 0, 0.15)' : 'none',
      opacity: opacity,
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      <Handle type="target" position={Position.Left} style={{ background: '#555', opacity: isDimmed ? 0 : 1 }} />
      
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>{data.id}</div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>{data.label}</div>
      </div>

      {data.lab && (
        <div style={{ 
          padding: '8px 12px', 
          backgroundColor: isBlocked ? '#fecaca' : isPrereq ? '#dbeafe' : isFocused ? '#fef08a' : '#f1f5f9',
          borderTop: `1px solid ${borderColor}`,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{data.lab.id} (LAB)</div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px' }}>{data.lab.label}</div>
        </div>
      )}

      <Handle type="source" position={Position.Right} style={{ background: '#555', opacity: isDimmed ? 0 : 1 }} />
    </div>
  );
}