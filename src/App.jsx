// src/App.jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MarkerType, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { planDeEstudios } from './cursos';
import CourseGroupNode from './CourseGroupNode';

const nodeTypes = { courseGroup: CourseGroupNode };

export default function App() {
  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCourse = useMemo(() => {
    if (!focusedNodeId) return null;
    return planDeEstudios.find(c => c.id === focusedNodeId);
  }, [focusedNodeId]);

  const unlockedCourses = useMemo(() => {
    if (!focusedNodeId) return [];
    return planDeEstudios.filter(c => c.prq.includes(focusedNodeId));
  }, [focusedNodeId]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const semCounts = {}; 

    for (let i = 1; i <= 10; i++) {
      nodes.push({
        id: `sem-${i}`,
        position: { x: (i - 1) * 360, y: -60 },
        data: { label: `${i}° SEMESTRE` },
        draggable: false, selectable: false,
        style: { background: 'transparent', border: 'none', fontSize: '15px', fontWeight: 'bold', color: '#334155', width: 260, textAlign: 'center', pointerEvents: 'none' }
      });
    }

    planDeEstudios.forEach((curso) => {
      if (!semCounts[curso.sem]) semCounts[curso.sem] = 0;
      const xPos = (curso.sem - 1) * 360; 
      const yPos = (semCounts[curso.sem] * 130) + 20; 
      semCounts[curso.sem]++;

      nodes.push({
        id: curso.id,
        type: 'courseGroup',
        position: { x: xPos, y: yPos },
        data: { id: curso.id, label: curso.label, lab: curso.lab, isFocused: false, isBlocked: false, isPrereq: false, isDimmed: false, isSearched: false }
      });

      curso.prq.forEach((prereqId) => {
        edges.push({
          id: `e-${prereqId}-${curso.id}`,
          source: prereqId,
          target: curso.id,
          type: 'smoothstep', 
          animated: false,
          style: { stroke: '#cbd5e1', strokeWidth: 1, opacity: 0 }, 
          markerEnd: { type: MarkerType.ArrowClosed, color: '#cbd5e1' },
        });
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    const getBlockedCourses = (startId) => {
      const blocked = new Set();
      const queue = [startId];
      while (queue.length > 0) {
        const current = queue.shift();
        planDeEstudios.forEach(c => {
          if (c.prq.includes(current) && !blocked.has(c.id)) {
            blocked.add(c.id); queue.push(c.id);
          }
        });
      }
      return blocked;
    };

    const getPrereqCourses = (startId) => {
      const prereqs = new Set();
      const queue = [startId];
      while (queue.length > 0) {
        const current = queue.shift();
        const course = planDeEstudios.find(c => c.id === current);
        if (course && course.prq) {
          course.prq.forEach(p => {
            if (!prereqs.has(p)) { prereqs.add(p); queue.push(p); }
          });
        }
      }
      return prereqs;
    };

    const blockedSet = focusedNodeId ? getBlockedCourses(focusedNodeId) : new Set();
    const prereqSet = focusedNodeId ? getPrereqCourses(focusedNodeId) : new Set();
    const term = searchTerm.toLowerCase().trim();

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id.startsWith('sem-')) return n; 
        
        const isFocused = n.id === focusedNodeId;
        const isBlocked = blockedSet.has(n.id);
        const isPrereq = prereqSet.has(n.id);
        const isSearched = term.length > 2 && (n.data.label.toLowerCase().includes(term) || (n.data.lab && n.data.lab.label.toLowerCase().includes(term)));
        
        const isDimmed = (focusedNodeId && !isFocused && !isBlocked && !isPrereq) || (term.length > 2 && !isSearched && !focusedNodeId);
        
        return { ...n, data: { ...n.data, isFocused, isBlocked, isPrereq, isDimmed, isSearched } };
      })
    );

    setEdges((eds) =>
      eds.map((e) => {
        if (!focusedNodeId) return { ...e, style: { ...e.style, opacity: 0 }, animated: false }; 

        if (blockedSet.has(e.target) && (e.source === focusedNodeId || blockedSet.has(e.source))) {
          return { ...e, style: { stroke: '#ef4444', strokeWidth: 2.5, opacity: 1 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }, animated: true };
        }
        if (prereqSet.has(e.source) && (e.target === focusedNodeId || prereqSet.has(e.target))) {
          return { ...e, style: { stroke: '#3b82f6', strokeWidth: 2.5, opacity: 1 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, animated: true };
        }
        return { ...e, style: { ...e.style, opacity: 0 }, animated: false }; 
      })
    );
  }, [focusedNodeId, searchTerm]);

  const onNodeClick = useCallback((event, node) => {
    if (!node.id.startsWith('sem-')) {
      setFocusedNodeId(node.id);
      setSearchTerm(''); 
    }
  }, []);

  const onPaneClick = useCallback(() => setFocusedNodeId(null), []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <header style={{ 
        backgroundImage: "url('/Ing.-Electronica-2021-v-1536x643.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        <div style={{ padding: '15px 30px', backgroundColor: 'rgba(127, 29, 29, 0.85)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Plan de estudios 2025 INGENIERÍA ELECTRÓNICA</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Buscar curso (ej: Control, Física...)" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setFocusedNodeId(null); }}
              style={{ padding: '10px 15px', borderRadius: '20px', border: 'none', width: '250px', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
            />
          </div>
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Contenedor del Grafo */}
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow 
            nodes={nodes} edges={edges} nodeTypes={nodeTypes}
            onNodeClick={onNodeClick} onPaneClick={onPaneClick}
            nodesDraggable={false} fitView minZoom={0.1}
          >
            <Background color="#cbd5e1" gap={20} variant="dots" />
            <Controls />
            <MiniMap nodeStrokeColor={() => "#cbd5e1"} nodeColor={(n) => n.data?.isSearched ? "#22c55e" : n.data?.isBlocked ? "#ef4444" : n.data?.isPrereq ? "#3b82f6" : n.data?.isFocused ? "#eab308" : "#fff"} />
          </ReactFlow>
        </div>

        {/* PANEL LATERAL */}
        {selectedCourse && (
          <aside style={{ 
            width: '320px', backgroundColor: 'white', borderLeft: '1px solid #e2e8f0',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', zIndex: 5
          }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#7f1d1d', backgroundColor: '#fee2e2', padding: '4px 8px', borderRadius: '12px' }}>
                Semestre {selectedCourse.sem}
              </span>
              <h2 style={{ margin: '15px 0 5px 0', fontSize: '20px', color: '#1e293b' }}>{selectedCourse.label}</h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Código: {selectedCourse.id}</p>
            </div>

            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
              {selectedCourse.lab && (
                <div style={{ marginBottom: '20px', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #94a3b8' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#475569' }}>Incluye Laboratorio:</h3>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>{selectedCourse.lab.label}</p>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', color: '#3b82f6', borderBottom: '2px solid #eff6ff', paddingBottom: '5px' }}>Necesitas aprobar primero:</h3>
                {selectedCourse.prq.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Ninguno. Puedes llevarlo libremente.</p>
                ) : (
                  <ul style={{ paddingLeft: '20px', margin: '5px 0', fontSize: '13px', color: '#475569' }}>
                    {selectedCourse.prq.map(reqId => {
                      const reqCourse = planDeEstudios.find(c => c.id === reqId);
                      return <li key={reqId} style={{ marginBottom: '4px' }}>{reqCourse ? reqCourse.label : reqId}</li>;
                    })}
                  </ul>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '14px', color: '#ef4444', borderBottom: '2px solid #fee2e2', paddingBottom: '5px' }}>Abre los siguientes cursos:</h3>
                {unlockedCourses.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Este curso no bloquea ningún curso futuro directamente.</p>
                ) : (
                  <ul style={{ paddingLeft: '20px', margin: '5px 0', fontSize: '13px', color: '#475569' }}>
                    {unlockedCourses.map(c => (
                      <li key={c.id} style={{ marginBottom: '4px' }}>{c.label}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1e293b', color: '#94a3b8', textAlign: 'center', padding: '8px', fontSize: '12px' }}>
        Desarrollado por el Centro de estudiantes de Ingenieria Electronica 2026 - Universidad Nacional de san Agustin de Arequipa
      </footer>
    </div>
  );
}