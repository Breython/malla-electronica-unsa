// src/App.jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MarkerType, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { planDeEstudios } from './cursos';
import CourseGroupNode from './CourseGroupNode';

const nodeTypes = {
  courseGroup: CourseGroupNode,
};

export default function App() {
  const [focusedNodeId, setFocusedNodeId] = useState(null);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const semCounts = {}; 

    // Cabeceras de Columna
    for (let i = 1; i <= 10; i++) {
      nodes.push({
        id: `sem-${i}`,
        position: { x: (i - 1) * 360, y: -60 },
        data: { label: `${i}° SEMESTRE` },
        draggable: false,
        selectable: false,
        style: {
          background: 'transparent',
          border: 'none',
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#334155',
          width: 260,
          textAlign: 'center',
          pointerEvents: 'none'
        }
      });
    }

    // Nodos de los Cursos
    planDeEstudios.forEach((curso) => {
      if (!semCounts[curso.sem]) semCounts[curso.sem] = 0;
      const xPos = (curso.sem - 1) * 360; 
      const yPos = (semCounts[curso.sem] * 130) + 20; 
      semCounts[curso.sem]++;

      nodes.push({
        id: curso.id,
        type: 'courseGroup',
        position: { x: xPos, y: yPos },
        data: { 
          id: curso.id, 
          label: curso.label, 
          lab: curso.lab,
          isFocused: false,
          isBlocked: false,
          isPrereq: false,
          isDimmed: false
        }
      });

      // Flechas
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
    if (!focusedNodeId) {
      setNodes((nds) => nds.map(n => n.id.startsWith('sem-') ? n : { ...n, data: { ...n.data, isFocused: false, isBlocked: false, isPrereq: false, isDimmed: false } }));
      setEdges((eds) => eds.map(e => ({ ...e, style: { ...e.style, opacity: 0 }, animated: false })));
      return;
    }

    // Ruta Hacia Adelante (Rojo - Bloqueos)
    const getBlockedCourses = (startNodeId) => {
      const blocked = new Set();
      const queue = [startNodeId];
      while (queue.length > 0) {
        const current = queue.shift();
        planDeEstudios.forEach(c => {
          if (c.prq.includes(current) && !blocked.has(c.id)) {
            blocked.add(c.id);
            queue.push(c.id);
          }
        });
      }
      return blocked;
    };

    // Ruta Hacia Atrás (Azul - Pre-requisitos)
    const getPrereqCourses = (startNodeId) => {
      const prereqs = new Set();
      const queue = [startNodeId];
      while (queue.length > 0) {
        const current = queue.shift();
        const course = planDeEstudios.find(c => c.id === current);
        if (course && course.prq) {
          course.prq.forEach(p => {
            if (!prereqs.has(p)) {
              prereqs.add(p);
              queue.push(p);
            }
          });
        }
      }
      return prereqs;
    };

    const blockedSet = getBlockedCourses(focusedNodeId);
    const prereqSet = getPrereqCourses(focusedNodeId);

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id.startsWith('sem-')) return n; 
        
        const isFocused = n.id === focusedNodeId;
        const isBlocked = blockedSet.has(n.id);
        const isPrereq = prereqSet.has(n.id);
        const isDimmed = !isFocused && !isBlocked && !isPrereq;
        
        return { ...n, data: { ...n.data, isFocused, isBlocked, isPrereq, isDimmed } };
      })
    );

    setEdges((eds) =>
      eds.map((e) => {
        // Flechas Rojas
        if (blockedSet.has(e.target) && (e.source === focusedNodeId || blockedSet.has(e.source))) {
          return { ...e, style: { stroke: '#ef4444', strokeWidth: 2.5, opacity: 1 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }, animated: true };
        }
        // Flechas Azules
        if (prereqSet.has(e.source) && (e.target === focusedNodeId || prereqSet.has(e.target))) {
          return { ...e, style: { stroke: '#3b82f6', strokeWidth: 2.5, opacity: 1 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, animated: true };
        }
        return { ...e, style: { ...e.style, opacity: 0 }, animated: false }; 
      })
    );
  }, [focusedNodeId]);

  const onNodeClick = useCallback((event, node) => {
    if (!node.id.startsWith('sem-')) setFocusedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => setFocusedNodeId(null), []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '15px 25px', background: '#7f1d1d', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Malla Curricular Interactiva</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#fca5a5' }}>Ingeniería Electrónica - UNSA</p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodesDraggable={false} 
          fitView
          minZoom={0.1}
        >
          <Background color="#cbd5e1" gap={20} variant="dots" />
          <Controls />
          
          <Panel position="bottom-left" style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', fontSize: '13px', marginLeft: '10px', marginBottom: '10px' }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>Leyenda</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ width: 14, height: 14, background: '#eab308', borderRadius: '50%', marginRight: 8 }}></div>
              <span>Curso Seleccionado</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ width: 14, height: 14, background: '#3b82f6', borderRadius: '50%', marginRight: 8 }}></div>
              <span>Pre-requisitos (Aprobados)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, background: '#ef4444', borderRadius: '50%', marginRight: 8 }}></div>
              <span>Cursos Bloqueados (Retraso)</span>
            </div>
          </Panel>

          <MiniMap nodeStrokeColor={() => "#cbd5e1"} nodeColor={(n) => n.data?.isBlocked ? "#ef4444" : n.data?.isPrereq ? "#3b82f6" : n.data?.isFocused ? "#eab308" : "#fff"} />
        </ReactFlow>
      </div>
    </div>
  );
}