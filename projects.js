/*
  PROJECT DATA — edit this file to add, remove or reorder projects.
  Each project:
    id        short unique slug
    category  "industry" | "research" | "impact"   (drives the filter chips)
    org       small label above the title
    title     project name
    summary   one sentence shown on the card and in the detail view
    points    bullet points in the detail view
    tags      skills/tools chips
    images    [ ["path", "caption"], ... ]  — the first image is the card cover
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
      "Replaced fragile 3D-printed camera mounts with sheet-metal mounts with two adjustable degrees of freedom.",
      "Designed print-in-place, assembly-free brackets with custom support fins, using less material than auto-generated supports when printing at scale."
    ],
    tags: ["Onshape", "DFM", "3D printing", "Sheet metal", "Arduino"],
    images: [
      ["images/projects/rack-deployed.jpg", "Camera + lidar rack deployed on a wheel loader"],
      ["images/projects/rack-a.jpg", "Sensor rack CAD"],
      ["images/projects/rack-corner.jpg", "Corner lidar mount + extrusion brackets CAD"],
      ["images/projects/camera-mount.jpg", "Sheet-metal camera mount"],
      ["images/projects/camera-bracket.jpg", "Camera mount bracket CAD"],
      ["images/projects/camera-housing.jpg", "Camera housing CAD"],
      ["images/projects/rack-b.jpg", "DFM: print-in-place support walls"],
      ["images/projects/rack-b2.jpg", "DFM bracket, second view (CAD)"]
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
      "Replaces a cumbersome arm-mounted unit with one that's held in one hand and easier to learn.",
      "AprilTags on the T-handle track the unit in space for demonstrations and spatial data collection.",
      "Designed a printed, vented control enclosure housing an Arduino Uno and DM542 stepper driver, with a joystick on the lid.",
      "Joystick → Arduino → stepper driver → rotating magnet → wheeled robot; 3–4× better spatial accuracy.",
      "Goal: use handheld data to reduce residuals between camera-based and arm-kinematic pose estimates."
    ],
    tags: ["Arduino", "Stepper control", "ROS", "Enclosure design"],
    images: [
      ["images/projects/dong-handheld.jpg", "Handheld unit with AprilTags"],
      ["images/projects/dong-enclosure-cad.jpg", "Vented control enclosure CAD"],
      ["images/projects/dong-electronics.jpg", "Arduino + DM542 stepper driver"],
      ["images/projects/dong-joystick.jpg", "Joystick on the enclosure lid"]
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
      "Go Baby Go: modified 5 ride-on cars with accessible button controls and a relay-based kill switch.",
      "TOM Makeathon: built 3 devices in 24 hours for a child with cerebral palsy.",
      "Led a workshop rewiring toys with accessible 3D-printed buttons.",
      "Wrote open-source documentation covering sourcing, procedures and specifications."
    ],
    tags: ["Human-centered design", "Wiring", "3D printing"],
    images: [
      ["images/projects/tom-presentation.jpg", "Presenting the finished devices to the family"],
      ["images/projects/tom-team.jpg", "Makeathon team with the completed devices"],
      ["images/projects/tom-button.jpg", "3D-printed button interface"],
      ["images/projects/tom-killswitch.jpg", "Relay-based kill switch"],
      ["images/projects/tom-wiring.jpg", "Modified wiring schematic"]
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
      ["images/projects/ftc-robot.jpg", "Competition robot"],
      ["images/projects/ftc-end-effector.jpg", "End-effector CAD"],
      ["images/projects/ftc-drivetrain.jpg", "Drivetrain assembly CAD"],
      ["images/projects/ftc-pocketed.jpg", "Plate pocketed for weight"]
    ]
  }
];
