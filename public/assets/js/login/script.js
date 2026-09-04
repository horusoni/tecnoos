 // --- 1. SIMULAÇÃO DE LOGIN ---
        function handleLogin(event) {
            event.preventDefault();
            const btn = document.getElementById('submitBtn');
            const originalHTML = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Autenticando...`;

            setTimeout(() => {
                alert('Autenticação bem-sucedida! Entrando no Workspace OPERIX...');
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }, 1200);
        }

        // --- 2. PLANETA DE CIRCUITOS TRIDIMENSIONAIS (THREE.JS) ---
        const container = document.getElementById('circuit-globe-container');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 340;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Grupo principal do Planeta
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const radius = 120;

        // A. Esfera interna wireframe/técnica sutil (base geométrica)
        const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0xCBD5E1,
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
        globeGroup.add(innerSphere);

        // B. Geração de Trilhas de Circuitos Esféricos reais (linhas curvas na superfície)
        const circuitMaterialSlate = new THREE.LineBasicMaterial({ color: 0x64748B, transparent: true, opacity: 0.45, linewidth: 1 });
        const circuitMaterialGreen = new THREE.LineBasicMaterial({ color: 0x00C853, transparent: true, opacity: 0.85, linewidth: 2 });

        // Gerar linhas de latitude/longitude com recortes de circuito e diagonais geométricas
        const circuitGroup = new THREE.Group();

        // Linhas longitudinais e latitudinais curvadas na esfera com nós
        for (let i = 0; i < 18; i++) {
            const phi = (i / 18) * Math.PI;
            const points = [];
            for (let j = 0; j <= 50; j++) {
                const theta = (j / 50) * Math.PI * 2;
                // Adicionar pequena modulação para parecer trilha de circuito integrada
                const r = radius * (1 + Math.sin(theta * 4) * 0.02);
                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.cos(phi);
                const z = r * Math.sin(phi) * Math.sin(theta);
                points.push(new THREE.Vector3(x, y, z));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const isGreen = (i % 4 === 0);
            const line = new THREE.Line(geometry, isGreen ? circuitMaterialGreen : circuitMaterialSlate);
            circuitGroup.add(line);
        }

        // Arcos de circuitos cruzando a esfera (trilhas diagonais)
        for (let k = 0; k < 14; k++) {
            const angle = (k / 14) * Math.PI * 2;
            const curvePoints = [];
            for (let t = 0; t <= 40; t++) {
                const f = t / 40;
                const lat = (f - 0.5) * Math.PI;
                const lon = angle + Math.sin(f * Math.PI * 3) * 0.4;
                const x = radius * Math.cos(lat) * Math.cos(lon);
                const y = radius * Math.sin(lat);
                const z = radius * Math.cos(lat) * Math.sin(lon);
                curvePoints.push(new THREE.Vector3(x, y, z));
            }
            const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
            const curveLine = new THREE.Line(curveGeo, k % 3 === 0 ? circuitMaterialGreen : circuitMaterialSlate);
            circuitGroup.add(curveLine);
        }

        globeGroup.add(circuitGroup);

        // C. Nós de conexão (circulares/pontos eletrônicos nas intersecções)
        const nodeGeometry = new THREE.SphereGeometry(2.2, 8, 8);
        const nodeMaterialSlate = new THREE.MeshBasicMaterial({ color: 0x475569 });
        const nodeMaterialGreen = new THREE.MeshBasicMaterial({ color: 0x00C853 });

        const nodesGroup = new THREE.Group();
        for (let i = 0; i < 120; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            const isHighlight = i % 7 === 0;
            const nodeMesh = new THREE.Mesh(nodeGeometry, isHighlight ? nodeMaterialGreen : nodeMaterialSlate);
            nodeMesh.position.set(x, y, z);
            nodesGroup.add(nodeMesh);
        }
        globeGroup.add(nodesGroup);

        // Anéis orbitais tecnológicos externos
        const ringGeo1 = new THREE.RingGeometry(155, 155.8, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00C853, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
        const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
        ringMesh1.rotation.x = Math.PI / 2.5;
        globeGroup.add(ringMesh1);

        const ringGeo2 = new THREE.RingGeometry(185, 186, 64);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x64748B, side: THREE.DoubleSide, transparent: true, opacity: 0.18 });
        const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
        ringMesh2.rotation.y = Math.PI / 3;
        globeGroup.add(ringMesh2);

        // Interação de Arrastar (Mouse / Touch)
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            globeGroup.rotation.y += deltaX * 0.005;
            globeGroup.rotation.x += deltaY * 0.005;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            globeGroup.rotation.y += deltaX * 0.005;
            globeGroup.rotation.x += deltaY * 0.005;

            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });

        window.addEventListener('touchend', () => { isDragging = false; });

        // Redimensionamento
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });

        // Loop de animação contínua e elegante
        function animate() {
            requestAnimationFrame(animate);

            if (!isDragging) {
                globeGroup.rotation.y += 0.0012; // Rotação lenta e natural no próprio eixo
            }

            renderer.render(scene, camera);
        }

        animate();