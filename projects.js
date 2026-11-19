/*
  PROJECT DATA — edit this file to add, remove or reorder projects.
  Each project:
    id        short unique slug
    category  "industry" | "research" | "impact"
    org       small label above the title
    title     project name
    summary   one sentence under the title
    points    bullet points
    tags      skills/tools chips
    images    [ ["path", "caption"], ... ]  — the first image is shown largest
    rows      (optional) images per row, e.g. [2, 2]; { n: 3, height: 140 } makes a row smaller
  After adding images, run tools\sizes.ps1 (see README).
*/
const PROJECTS = [
  {
    id: "sensor-rack",
    category: "industry",
    org: "Actor Labs",
    title: "Sensor Rack for Autonomous Heavy Machinery",
    summary: "An adjustable aluminum-extrusion rack carrying cameras, lidar and compute on top of loaders and excavators.",
    points: [
      "Aluminum-extrusion frame with 3D-printed brackets adjusts to the shape and size of most worksite machines.",
      "Hemispherical-FOV lidar on each corner with adjustable angle and height for safety coverage.",
      "Relay-controlled light bar, driven by an Arduino talking to the onboard computer, signals when the machine is under autonomous control.",
      "Replaced fragile 3D-printed camera mounts that broke in the field with sheet-metal mounts with two adjustable degrees of freedom.",
      "Designed print-in-place, assembly-free brackets with custom support fins, using less material than auto-generated supports when printing at scale.",
      "Improved deployment speed, machine safety and hardware lifespan over the previous rack."
    ],
    tags: ["Onshape", "DFM", "3D printing", "Sheet metal", "Aluminum extrusion", "Arduino"],
    images: [
      ["images/projects/rack-deployed.jpg", "Camera + lidar rack deployed on a wheel loader"],
      ["images/projects/rack-a.jpg", "Sensor rack CAD"],
      ["images/projects/rack-vehicle.jpg", "Rack mounted on a vehicle"],
      ["images/projects/camera-mount.jpg", "Sheet-metal camera mount"],
      ["images/projects/rack-frame.jpg", "Extrusion frame with corner brackets"],
      ["images/projects/rack-layout.jpg", "Full rack layout with wiring, before install"],
      ["images/projects/rack-corner.jpg", "Corner lidar mount + extrusion brackets CAD"],
      ["images/projects/camera-bracket.jpg", "Camera mount bracket CAD"],
      ["images/projects/rack-b.jpg", "DFM: print-in-place support walls"]
    ]
  },
  {
    id: "field-deployment",
    category: "industry",
    org: "Actor Labs",
    title: "Field Deployment on Heavy Machinery",
    summary: "Installing and supporting autonomy, safety and data hardware on customer excavators and wheel loaders.",
    points: [
      "Hardware deployed across 20+ contracted worksites.",
      "Installed sensor racks, cameras and data nodes on excavators and wheel loaders in the field.",
      "Worked on an electric excavator rig, including its high-voltage junction box.",
      "Field feedback drove design revisions to mounts, enclosures and cable routing."
    ],
    tags: ["Field installation", "Wiring", "Heavy machinery", "Testing"],
    rows: [4],
    images: [
      ["images/projects/field-install-team.jpg", "Field install at a customer site"],
      ["images/projects/field-excavator-install.jpg", "Installing hardware in an excavator"],
      ["images/projects/field-ex-rig.jpg", "Electric excavator rig"],
      ["images/projects/field-hv-box.jpg", "Electric excavator high-voltage junction box"]
    ]
  },
  {
    id: "data-node",
    category: "industry",
    org: "Actor Labs",
    title: "4-Camera Data Collection Node",
    summary: "A ruggedized unit that stores and wirelessly uploads video from four cameras on heavy machinery. Adopted as the company's primary hardware.",
    points: [
      "100+ units built (more than all previous versions combined) and 50+ deployed with successful field performance.",
      "Raspberry Pi core with relay board, USB hub, cellular modem and RJ45 uplink.",
      "Custom electronics tray manages cable routing and component clearance; planned power supply and wiring.",
      "IP-rated enclosure with cable glands; thermal, UV, vibration and IP testing drove revisions to fan placement, enclosure color and rubber-damped mounting brackets."
    ],
    tags: ["Fusion 360", "Enclosure design", "Raspberry Pi", "Environmental testing"],
    images: [
      ["images/projects/node-a.jpg", "Data node, enclosure open"],
      ["images/projects/node-b.jpg", "Electronics tray CAD"],
      ["images/projects/node-c.jpg", "Node production line"],
      ["images/projects/node-d.jpg", "Assembled node, ready to deploy"],
      ["images/projects/node-mount.jpg", "Node mounting bracket CAD"]
    ]
  },
  {
    id: "biliary-phantoms",
    category: "research",
    org: "Dong Lab · Vanderbilt",
    title: "Biliary Tract Phantoms",
    summary: "Printed anatomical models used to test magnetic soft robots and guidewires before ex vivo and in vivo work.",
    points: [
      "Rescaled and sliced an ERCP 3D anatomy model into printable sections.",
      "Phantom 1 (1.15× scale, flexible resin) tests soft wheeled-robot maneuverability in tortuous channels.",
      "Phantom 2 (1.25× scale) adds the upper GI tract in TPU to test guidewire and robot delivery end to end.",
      "Formlabs Elastic 50A resin for the biliary tract, washed and cured; TPU for the upper GI on a Bambu Lab printer.",
      "Laser-cut acrylic bases and 3D-printed pillar supports hold each phantom in the right orientation for demos and data collection."
    ],
    tags: ["Resin printing", "TPU", "Laser cutting", "Medical devices"],
    images: [
      ["images/projects/dong-phantom.jpg", "Biliary phantom on acrylic mount"],
      ["images/projects/dong-phantom-cad.jpg", "Phantom and mount CAD"],
      ["images/projects/dong-printed-parts.jpg", "Printed resin sections before assembly"],
      ["images/projects/dong-phantom-gi.jpg", "Phantom 2: biliary tract + upper GI"]
    ]
  },
  {
    id: "handheld-actuator",
    category: "research",
    org: "Dong Lab · Vanderbilt",
    title: "Handheld Magnetic Actuation Unit",
    summary: "A compact, tracked handheld version of the arm-mounted magnet that steers soft robots, with joystick control.",
    points: [
      "Characterized actuation of a magnetic soft robot across 15+ setups on a ROS-driven 7-DOF arm.",
      "Replaced the cumbersome arm-mounted unit with one that's held in one hand and easier to learn.",
      "AprilTags on the T-handle track the unit in space for demonstrations and spatial data collection.",
      "Designed a printed, vented control enclosure housing an Arduino Uno and DM542 stepper driver, with a joystick on the lid.",
      "Joystick → Arduino → stepper driver → rotating magnet → wheeled robot; 3–4× better spatial accuracy."
    ],
    tags: ["Arduino", "Stepper control", "ROS", "Enclosure design"],
    rows: [2, 2],
    images: [
      ["images/projects/dong-handheld.jpg", "Handheld unit with AprilTags"],
      ["images/projects/dong-arm-phantom.jpg", "7-DOF arm with magnet over the phantom"],
      ["images/projects/dong-enclosure-cad.jpg", "Vented control enclosure CAD"],
      ["images/projects/dong-electronics.jpg", "Arduino + DM542 stepper driver"]
    ]
  },
  {
    id: "pneumatic-brake",
    category: "industry",
    org: "Actor Labs",
    title: "Pneumatic Braking System",
    summary: "A pneumatic system that actuates the brake on a front loader under computer control.",
    points: [
      "Full pneumatic circuit: compressor, regulator, pressure switch, emergency release valve, tank, manifold, solenoid and cylinder.",
      "Sourced parts against working pressure, part ratings and safety guidelines.",
      "Designed and fabricated a sheet-metal cylinder mount that interfaces with the brake lever arm.",
      "Wired the compressor and pressure switch, and solenoids via relays and an ESP32."
    ],
    tags: ["Pneumatics", "ESP32", "Sheet metal", "Safety systems"],
    images: [
      ["images/projects/pneu-solenoid.jpg", "Solenoid valve manifold (A/B ports)"],
      ["images/projects/pneu-tank.jpg", "Air storage tank"]
    ]
  },
  {
    id: "test-chamber",
    category: "industry",
    org: "Actor Labs",
    title: "Environmental Test Chamber",
    summary: "A low-cost chamber for stress-testing electronics and hardware before field deployment.",
    points: [
      "Tests thermal, UV, vibration and ingress protection (water spray and particulates).",
      "Sustained 125 °F with UV exposure over multi-day tests, regulated by a PID controller.",
      "Vibration plate simulates the heavy vibration and jerking seen on machinery.",
      "Swappable test surfaces (plastic and steel with different coatings) mimic real mounting and solar-absorption conditions."
    ],
    tags: ["Test design", "PID control", "Aluminum extrusion"],
    images: [
      ["images/projects/chamber-heat.jpg", "Heat lamp and thermal probe"],
      ["images/projects/chamber-pid.jpg", "PID controller and circulation fan"]
    ]
  },
  {
    id: "flashing-station",
    category: "industry",
    org: "Actor Labs",
    title: "SD-Card Flashing Station",
    summary: "A parallel flashing rig that sped up a bottleneck step in data-node assembly.",
    points: [
      "Built around Raspberry Pis with USB data hubs and adapters.",
      "Dual-Pi revision flashes 16 cards at once.",
      "Standardized the flashing step across the build line and increased assembly throughput."
    ],
    tags: ["Raspberry Pi", "Enclosure design", "Manufacturing"],
    images: [
      ["images/projects/flash-station.jpg", "Dual-Pi revision, 16 ports"],
      ["images/projects/flash-cad.jpg", "Parallel SD readers — CAD"]
    ]
  },
  {
    id: "stormwater",
    category: "impact",
    org: "Engineers Without Borders",
    title: "Stormwater Monitoring System",
    summary: "An autonomous sensor module measuring flow, turbidity, soil moisture and pH of stormwater runoff.",
    points: [
      "Version 2 redesign built for 2-week unattended underground deployments.",
      "Compartmentalized acrylic housing waterproofs the unit and isolates electronics from wetted sensors.",
      "Prototype with 4 sensors, a custom PCB and 10–12 custom 3D-printed and laser-cut parts.",
      "Bench-tested and calibrated sensors against reference data to evaluate accuracy."
    ],
    tags: ["Waterproofing", "Sensors", "PCB", "Laser cutting"],
    images: [
      ["images/projects/ewb-layout.jpg", "Housing layout CAD"],
      ["images/projects/ewb-housing.jpg", "Compartmentalized acrylic housing"]
    ]
  },
  {
    id: "assistive-devices",
    category: "impact",
    org: "Tikkun Olam Makers",
    title: "Assistive Device Engineering",
    summary: "Custom devices, mobility aids and adaptive toys designed with and for people with disabilities.",
    points: [
      "TOM Makeathon: built 3 devices in 24 hours for a child with cerebral palsy, including an adapted high chair and a walker / gait trainer.",
      "Go Baby Go: modified 5 ride-on cars with accessible button controls and a relay-based kill switch.",
      "Led a workshop rewiring toys with accessible 3D-printed buttons.",
      "Wrote open-source documentation covering sourcing, procedures and specifications."
    ],
    tags: ["Human-centered design", "Wiring", "3D printing", "PVC fabrication"],
    rows: [3, { n: 3, height: 140 }],
    images: [
      ["images/projects/tom-team.jpg", "Makeathon team with the completed devices"],
      ["images/projects/tom-highchair.jpg", "Adapted high chair prototype"],
      ["images/projects/tom-walker.jpg", "Walker / gait trainer"],
      ["images/projects/tom-button.jpg", "Go Baby Go: 3D-printed button interface"],
      ["images/projects/tom-killswitch.jpg", "Go Baby Go: relay-based kill switch"],
      ["images/projects/tom-wiring.jpg", "Go Baby Go: modified wiring schematic"]
    ]
  },
  {
    id: "ftc-robot",
    category: "impact",
    org: "FIRST Tech Challenge",
    title: "Competition Robot Design",
    summary: "Mechanical design and controls for a competition robot, from drivetrain to end effector.",
    points: [
      "Led mechanical design and fabrication of the drivetrain, gearboxes and linear slides in Fusion 360.",
      "Designed the end-effector manipulator from concept through weight-optimized, pocketed CAD.",
      "Implemented and tuned PID, motion profiling, pure pursuit and odometry-based state estimation.",
      "Qualified for regional and international competitions; awards for hardware design and control systems."
    ],
    tags: ["Fusion 360", "Controls", "Structural design"],
    images: [
      ["images/projects/ftc-robot-2.jpg", "Competition robot (team 19896)"],
      ["images/projects/ftc-scissor.jpg", "Scissor lift prototype"],
      ["images/projects/ftc-end-effector.jpg", "End-effector CAD"],
      ["images/projects/ftc-drivetrain.jpg", "Drivetrain assembly CAD"],
      ["images/projects/ftc-pocketed.jpg", "Plate pocketed for weight"],
      ["images/projects/ftc-build-space.jpg", "Team build space"]
    ]
  },
  {
    id: "fabrication",
    category: "impact",
    org: "Shop work",
    title: "Welding, Laser Cutting & Sketching",
    summary: "Hands-on fabrication and hand-drawn design work, including a welded steel truss for my statics class.",
    points: [
      "Welded a steel truss for statics, using a fixture to hold members in alignment. In progress: load-bearing calculations, failure-mode analysis and a simulation model, then load-testing the truss and comparing results.",
      "Designed and laser-cut a slot-together rocket model.",
      "Hand-sketched an exploded view to work through an assembly before CAD."
    ],
    tags: ["Welding", "Statics", "Laser cutting", "Sketching"],
    images: [
      ["images/projects/fab-frame.jpg", "Welded steel truss"],
      ["images/projects/fab-weld.jpg", "Weld close-up"],
      ["images/projects/fab-fixture.jpg", "Truss on the weld fixture"],
      ["images/projects/fab-rocket.jpg", "Laser-cut slot-together rocket"],
      ["images/projects/fab-sketch.jpg", "Hand-drawn exploded view"]
    ]
  }
];
