"use client";

import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";

import Draggable from "react-draggable";
import { Popover } from "radix-ui";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  OrthographicCamera,
  Grid,
  OrbitControls,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "./ui/Badge";
import { Moon, Monitor, Sun, TriangleAlert } from "lucide-react";
import api from "@/lib/api";

interface FloatingPanelDetailsProps {
  panel: Panel;
  position: { x: number; y: number };
  onClose: () => void;
}

const directionMultipliers: { [key: string]: number[] } = {
  North: Array(24).fill(0.5),
  East: [
    1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1, 0.2, 0.3,
    0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2,
  ],
  South: Array(24).fill(1.0),
  West: [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.1, 1.0,
    0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
  ],
};

const FloatingPanelDetails: React.FC<FloatingPanelDetailsProps> = ({
  panel,
  position,
  onClose,
}) => {
  const chartData = generateHourlyOutput(panel);

  return (
    <Popover.Root open onOpenChange={(open) => !open && onClose()}>
      <Popover.Trigger asChild>
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: 20,
            height: 20,
            transform: "translate(-50%, -50%)",
          }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="center"
          alignOffset={-50}
          sideOffset={5}
          className="bg-white p-6 rounded-md shadow-lg border border-gray-300 z-[1000]"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Panel {panel.id} Details
          </h2>
          <p className="text-gray-800">
            <strong>Peak:</strong> {panel.peak}
          </p>
          <p className="text-gray-800">
            <strong>Direction:</strong> {panel.direction}
          </p>
          <p className="text-gray-800">
            <strong>Current Output:</strong> {panel.currentOutput} W
          </p>
          {/* Include the chart here */}
          <div className="mt-4" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="time" minTickGap={20} stroke="#374151" />
                <YAxis
                  label={{
                    value: "Output (W)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#374151",
                  }}
                  stroke="#374151"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #d1d5db",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="output"
                  stroke="#f59e0b"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 rounded shadow"
          >
            Close
          </button>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

enum Mode {
  Edit = "edit",
  View = "view",
}

interface HourlyData {
  timestamp: Date;
  output: number;
}

interface Panel {
  id: number;
  gridIndex: number;
  row: number;
  col: number;
  peak: number;
  currentOutput: number;
  direction: string;
}

const ENERGY_COST = 1000;

function generateChartData(panel: Panel): { time: string; output: number }[] {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    let baseOutput = 0;

    if (hour >= 6 && hour < 18) {
      const ratio = Math.sin(((hour - 6) / 12) * Math.PI);
      baseOutput = panel.peak * ratio;
    }

    const noise = ((panel.id + panel.row + panel.col + hour) % 10) - 5;
    const output = Math.max(0, Math.round(baseOutput + noise));
    data.push({
      time: timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      output,
    });
  }
  return data;
}

function generateHourlyOutput(
  panel: Panel
): { time: string; output: number }[] {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();

    const daylightFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
    const baseOutput = panel.peak * daylightFactor;

    const directionMultiplier = directionMultipliers[panel.direction][hour];
    const adjustedOutput = baseOutput * directionMultiplier;

    const noise = ((panel.id + panel.row + panel.col + hour) % 10) - 5;
    const finalOutput = Math.max(0, Math.round(adjustedOutput + noise));

    data.push({
      time: timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      output: finalOutput,
    });
  }

  return data;
}

const getSimulatedOutputForHour = (timestamp: Date, peak: number): number => {
  const hour = timestamp.getHours();
  if (hour < 6 || hour >= 18) return 0;
  const ratio = Math.sin(((hour - 6) / 12) * Math.PI);
  const noise = (Math.random() - 0.5) * 20;
  return Math.max(0, Math.round(peak * ratio + noise));
};


const createNewPanel = (gridIndex: number, id: number): Panel => {
  const row = Math.floor(gridIndex / 10);
  const col = gridIndex % 10;
  const peak = Math.random() * 100 + 300;
  const now = new Date();
  const currentOutput = getSimulatedOutputForHour(now, peak);

  const direction = "East";
  return {
    id,
    gridIndex,
    row,
    col,
    peak,
    currentOutput,
    direction,
  };
};

interface SolarPanelMeshProps {
  panel: Panel;
  position: [number, number, number];
  onClick: (event: ThreeEvent<MouseEvent>) => void;
}

const SolarPanelMesh: React.FC<SolarPanelMeshProps> = ({
  panel,
  position,
  onClick,
}) => {
  const directionAngles: { [key: string]: number } = {
    South: 0,
    East: -Math.PI / 2,
    North: Math.PI,
    West: Math.PI / 2,
  };
  const yRotation = directionAngles[panel.direction] || 0;
  const tiltAngle = Math.PI / 6;

  return (
    <group position={position} onClick={onClick} rotation={[0, yRotation, 0]}>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-tiltAngle, 0, 0]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#1d4ed8" side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, 0.5, 0]} center>
        <Badge
          variant="secondary"
          className="badge flex-col items-center gap-2 py-2 bg-white/75 -z-1 ring-1 ring-black/10"
        >
          {panel.peak < 200 ? (
            <TriangleAlert
              className="h-4 w-4 text-red-500 animate-pulse animate-ping
"
            />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500" />
          )}
          <span className="text-[0.5rem]">{panel.currentOutput}W</span>
        </Badge>
      </Html>
    </group>
  );
};

const getNextDirection = (current: string): string => {
  const order = ["North", "East", "South", "West"];
  const index = order.indexOf(current);
  return order[(index + 1) % order.length];
};

interface GridCellProps {
  index: number;
  panel?: Panel;
  onToggle: (gridIndex: number) => void;
  onRotate: (gridIndex: number) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  index,
  panel,
  onToggle,
  onRotate,
}) => {
  const handleClick = () => {
    if (panel) {
      const isGreen = panel.currentOutput >= 0 * 0.5;
      if (isGreen) {
        if (panel.direction === "North") {
          onToggle(index);
        } else {
          onRotate(index);
        }
        return;
      }
    }

    onToggle(index);
  };

  let cellColor = "bg-gray-50";
  let isGreen = false;
  if (panel) {
    isGreen = panel.currentOutput >= 0 * 0.5;
    cellColor = isGreen ? "bg-green-300" : "bg-red-300";
  }

  let baseRotationDeg = 0;
  if (panel) {
    if (panel.direction === "North") baseRotationDeg = 0;
    else if (panel.direction === "East") baseRotationDeg = 90;
    else if (panel.direction === "South") baseRotationDeg = 180;
    else if (panel.direction === "West") baseRotationDeg = 270;
  }

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center justify-center md:w-4 md:h-4 lg:w-12 lg:h-12 cursor-pointer border border-gray-300 ${cellColor}`}
    >
      {panel && isGreen && (
        <div style={{ transform: `rotate(${baseRotationDeg}deg)` }}>
          <div>↑</div>
        </div>
      )}
    </div>
  );
};

interface TopDownGridProps {
  panels: Panel[];
  onToggle: (gridIndex: number) => void;
  onRotate: (gridIndex: number) => void;
}

const TopDownGrid: React.FC<TopDownGridProps> = ({
  panels,
  onToggle,
  onRotate,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-0 items-center justify-center">
      <div className="grid grid-cols-10 gap-0">
        {Array(100)
          .fill(null)
          .map((_, index) => {
            const panel = panels.find((p) => p.gridIndex === index);
            return (
              <GridCell
                key={index}
                index={index}
                panel={panel}
                onToggle={onToggle}
                onRotate={onRotate}
              />
            );
          })}
      </div>
    </div>
  );
};

interface IsometricSceneProps {
  panels: Panel[];
  onPanelClick: (panel: Panel, event: React.MouseEvent) => void;
}

const IsometricScene: React.FC<IsometricSceneProps> = ({
  panels,
  onPanelClick,
}) => {
  const panelPositions = panels.map((panel) => {
    const x = panel.col - 5 + 0.5;
    const z = panel.row - 5 + 0.5;
    return { ...panel, position: [x, 0.1, z] as [number, number, number] };
  });

  return (
    <Canvas
      className="w-full h-full"
      style={{ background: "rgba(255, 255, 255, 0)" }}
    >
      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        target={[0, 0, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1} />
      <Grid
        args={[10, 10]}
        position={[0, 0, 0]}
        sectionColor={"#7d7d7d"}
        cellColor={"#1d4ed8"}
      />
      {panelPositions.map((panel) => (
        <SolarPanelMesh
          key={panel.id}
          panel={panel}
          position={panel.position}
          onClick={(e: ThreeEvent<MouseEvent>) => onPanelClick(panel, e as any)}
        />
      ))}
    </Canvas>
  );
};

interface StatsPanelProps {
  panels: Panel[];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ panels }) => {
  const totalOutput = panels.reduce(
    (sum, panel) => sum + panel.currentOutput,
    0
  );
  const netOutput = totalOutput - ENERGY_COST;

  return (
    <div className="bg-white top-[100%] left-0 translate-y-[-100%] p-4 absolute rounded-md shadow-md mt-4 -ml-4 w-full max-w-xl sm:max-w-md sm:text-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-2 text-gray-900">Solar Farm Stats</h2>
      <div className="mb-2 text-gray-800">
        <span>Total Output: {totalOutput} W</span>
        <span className="ml-4">Net Output: {netOutput} W</span>
      </div>
      <div className="w-full">
        <table className="w-full text-sm text-gray-800">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-2 py-1 border border-gray-300">Panel ID</th>
              <th className="px-2 py-1 border border-gray-300">
                Current Output (W)
              </th>
              <th className="px-2 py-1 border border-gray-300">Direction</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[130px] overflow-y-auto">
          <table className="w-full text-sm text-gray-800">
            <tbody>
              {panels.map((panel: Panel) => {
                const rowClass =
                  panel.currentOutput < 0 * 0.5 ? "bg-red-200" : "bg-gray-100";
                return (
                  <tr key={panel.id} className={rowClass}>
                    <td className="px-2 py-1 border border-gray-300">
                      {panel.id}
                    </td>
                    <td className="px-2 py-1 border border-gray-300">
                      {panel.currentOutput}
                    </td>
                    <td className="px-2 py-1 border border-gray-300">
                      {panel.direction}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface PanelDetailsProps {
  panel: Panel;
  onClose: () => void;
}

interface ViewportProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  totalOutput: number;
  setTotalOutput: (totalOutput: number) => void;
  arrayId: string;
  setTitle: (title: string) => void;
}

const Viewport: React.FC<ViewportProps> = ({
  mode,
  setMode,
  totalOutput,
  setTotalOutput,
  arrayId,
  setTitle,
}) => {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const [detailsPosition, setDetailsPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const nextPanelIdRef = useRef<number>(1);
  const initialLoadCompleteRef = useRef(false);

  const needsSyncRef = useRef(false);

  useEffect(() => {
    const loadPanelsFromServer = async () => {
      console.log("Loading panels from server");
      try {
        const response = await api.get(`/arrays/${arrayId}`);
        const serverData = response.data;
        console.log("Serverdata:", serverData);

        const parsedPanels = JSON.parse(serverData.data || "[]");
        const fullPanels = parsedPanels.map((serverPanel: any) => {
          return {
            ...serverPanel,
          };
        });

        setPanels(fullPanels);
        const maxId = Math.max(...fullPanels.map((p: Panel) => p.id), 0);
        nextPanelIdRef.current = maxId + 1;
        initialLoadCompleteRef.current = true;
      } catch (error) {
        console.error("Failed to load panels from server:", error);
        initialLoadCompleteRef.current = true;
      }
    };

    loadPanelsFromServer();
  }, [arrayId]);

  useEffect(() => {
    if (!initialLoadCompleteRef.current || !needsSyncRef.current) return;

    const syncTimeout = setTimeout(async () => {
      try {
        const serializedPanels = panels.map((panel) => ({
          id: panel.id,
          gridIndex: panel.gridIndex,
          row: panel.row,
          col: panel.col,
          peak: panel.peak,
          currentOutput: panel.currentOutput,
          direction: panel.direction,
        }));

        console.log("Syncing panels:", serializedPanels);

        await api.put(`/arrays/${arrayId}`, {
          data: JSON.stringify(serializedPanels),
        });
        needsSyncRef.current = false;
      } catch (error) {
        console.error("Failed to sync panels with backend:", error);
      }
    }, 100);

    return () => clearTimeout(syncTimeout);
  }, [panels, arrayId]);

  const togglePanel = (gridIndex: number) => {
    const exists = panels.find((p) => p.gridIndex === gridIndex);
    if (exists) {
      setPanels((prevPanels) => {
        needsSyncRef.current = true;
        return prevPanels.filter((p) => p.gridIndex !== gridIndex);
      });
    } else {
      const newPanel = createNewPanel(gridIndex, nextPanelIdRef.current);
      nextPanelIdRef.current++;
      setPanels((prevPanels) => {
        needsSyncRef.current = true;
        return [...prevPanels, newPanel];
      });
    }
  };

  const rotatePanel = (gridIndex: number) => {
    setPanels((prevPanels) => {
      needsSyncRef.current = true;
      return prevPanels.map((panel) => {
        if (panel.gridIndex === gridIndex) {
          return { ...panel, direction: getNextDirection(panel.direction) };
        }
        return panel;
      });
    });
  };

  const handlePanelClick = (panel: Panel, event: React.MouseEvent) => {
    if (selectedPanel) {
      setSelectedPanel(null);
      setDetailsPosition(null);
      return;
    }
    setSelectedPanel(panel);
    setDetailsPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const newTotalOutput = panels.reduce(
      (sum, panel) => sum + panel.currentOutput,
      0
    );
    setTotalOutput(newTotalOutput);
  }, [panels, setTotalOutput]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPanels((prevPanels) => {
        return prevPanels.map((panel) => {
          const updatedOutput = generateHourlyOutput(panel)[0].output;
          return { ...panel, currentOutput: updatedOutput };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative bg-transparent">
      <main
        className={`flex flex-col items-center justify-between w-full h-full min-h-full ${
          selectedPanel ? "blur-sm" : ""
        }`}
      >
        {mode === Mode.Edit ? (
          <TopDownGrid
            panels={panels}
            onToggle={togglePanel}
            onRotate={rotatePanel}
          />
        ) : (
          <IsometricScene panels={panels} onPanelClick={handlePanelClick} />
        )}
        <StatsPanel panels={panels} />
      </main>

      {selectedPanel && detailsPosition && (
        <FloatingPanelDetails
          panel={selectedPanel}
          position={detailsPosition}
          onClose={() => {
            setSelectedPanel(null);
            setDetailsPosition(null);
          }}
        />
      )}
      <SimulationPanel panels={panels} setPanels={setPanels} />
    </div>
  );
};
const SimulationPanel = ({
  panels,
  setPanels,
}: {
  panels: Panel[];
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [peakOutput, setPeakOutput] = useState<number>(100);

  const handleMalfunction = () => {
    if (panels.length === 0) return;
    const randomIndex = Math.floor(Math.random() * panels.length);
    const randomPanel = panels[randomIndex];

    setPanels((prevPanels) =>
      prevPanels.map((panel) =>
        panel.id === randomPanel.id ? { ...panel, peak: panel.peak / 2 } : panel
      )
    );

    setOpen(false);
  };

  return (
    <div className="absolute top-0 right-0 my-4">
      <PopoverForm
        showSuccess={false}
        title="Simulation"
        open={open}
        setOpen={setOpen}
        width="200px"
        height="175px"
        showCloseButton={true}
        openChild={
          <div className="p-2">
            <h3 className="text-sm tracking-tight text-muted-foreground">
              Simulation
            </h3>
            <div className="pt-2 space-y-2">
              <button
                onClick={handleMalfunction}
                className="w-full flex items-center px-3 py-2 text-sm rounded-md"
              >
                Malfunction
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Viewport;
