export const projects = [
  {
    category: 'AI/ML',
    title: 'SecureConfigLLM',
    timeframe: 'March 2026 – May 2026',
    skills: ['Python', 'GroqAPI (Llama-3-8B/70B)', 'RAG', 'Scapy', 'Nginx', 'Docker', 'PostgreSQL', 'Pytest'],
    description:
      'SecureConfigLLM is a trust-but-verify framework that automates complex network configuration generation for Nginx, Iptables, and DNS while enforcing deterministic security baselines. I built a hybrid architecture that pairs Llama-3 with a custom validation engine and an agentic self-healing loop that re-prompts the model with failure logs until the output is secure. I also added a high-throughput MITM analysis pipeline with Scapy for live traffic and PCAP ingestion, real-time risk scoring, and threat interpretation reports.',
    link: 'https://github.com/RahilJain1366/NetSec',
  },
  {
    category: 'Quantum',
    title: 'Hybrid Quantum-Classical Model for Wildfire Spread Optimization in California',
    timeframe: 'March 2026 – April 2026',
    skills: ['Python', 'Qiskit', 'Quantum Computing', 'AWS (S3, Sagemaker, Braket)', 'VQE'],
    description:
      'I participated in the Deloitte Quantum Challenge 2026 to solve enterprise-scale optimization problems using near-term quantum computing techniques. I engineered parameterized quantum circuits with Python and Qiskit, implemented QAOA/VQE-inspired workflows, statevector simulation, transpilation, qubit mapping, noise-aware execution, and modular experiment pipelines that integrated classical optimizers with quantum measurements.',
    link: 'https://github.com/RahilJain1366/Deloitte_Quantum_Challenge_2026',
  },
  {
    category: 'Backend',
    title: 'Implementation of a Real-Time Currency Converter in Rust',
    timeframe: 'June 2025 - July 2025',
    skills: ['Rust', 'dotenv', 'CLI', 'Tokio', 'Serde', 'Reqwest'],
    description:
      'Developed a lightweight command-line application in Rust for real-time currency conversion using live financial data from exchangeratesapi.io. Implemented asynchronous programming with Tokio and Reqwest, added secure API key management with dotenv, and kept the codebase modular across main.rs, lib.rs, and utils.rs for scalability and maintainability.',
    link: 'https://github.com/RahilJain1366/Currency_Convertor',
  },
  {
    category: 'AI/ML',
    title: 'Classification of Plant Diseases using Deep Learning',
    timeframe: 'January 2025 – April 2025',
    skills: ['ResNet50', 'Vision Transformer', 'SVM', 'Flask'],
    description:
      'Built a real-time system for detecting plant diseases from leaf images using a hybrid CNN-Vision Transformer-SVM architecture. The model achieved 91.12% accuracy across 23 disease categories, with super-resolution preprocessing for enhanced leaf detection and a Flask dashboard for scalable diagnosis.',
    link: 'https://github.com/RahilJain1366/Classification-of-Plant-Diseases',
  },
  {
    category: 'Backend',
    title: 'Reduction of Test Data Volume in SoC Design',
    timeframe: 'Nov 2024 – Dec 2024',
    skills: ['C++', 'Graph Algorithms', 'Compression'],
    description:
      'Implemented a C++ solution for reducing test data volume in System-on-Chip design using dictionary-based compression with fixed-length indices. I modeled test patterns as a graph and applied heuristic clique partitioning to optimize dictionary selection for maximum compression efficiency and reduced transfer requirements.',
    link: 'https://github.com/RahilJain1366/Reduction-of-Test-Data-Volume-in-SoC-Design',
  },
  {
    category: 'AI/ML',
    title: 'Chromosome Classification using Deep Learning',
    timeframe: 'March 2021 – July 2021',
    skills: ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV'],
    description:
      'Automated karyotyping with a deep learning pipeline that achieved 96.6% accuracy across all 23 human chromosomes. The project used EfficientNet-B6 with LapSRN super-resolution, object detection via Detectron2 and YOLOv4, and classifiers including ResNet, VGG-16, and custom CNNs.',
    link: 'https://github.com/RahilJain1366/Classification-of-Chromosome',
  },
  {
    category: 'Backend',
    title: 'Audio-Based Environment Simulator',
    timeframe: 'January 2020',
    skills: ['TensorFlow', 'OpenCV', 'Raspberry Pi'],
    description:
      'Developed a wearable assistive technology prototype for visually impaired navigation, integrating Mask R-CNN for real-time object detection and instance segmentation with OpenCV and sensor inputs on Raspberry Pi 3. The system converted environmental information into 3D spatial audio cues for real-time navigation assistance.',
  },
];