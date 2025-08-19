// Replace the entire geometric-lines.js file with this clean version:

class GeometricLines {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mousePos = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.createNodes();
        this.bindEvents();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.container.appendChild(this.canvas);
        
        this.resize();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createNodes() {
        const nodeCount = 20;
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 3,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(223, 44, 20, 0.1)';
        this.ctx.lineWidth = 0.5;
        
    const gridSize = 50;
    const offsetX = (Date.now() * 0.018) % gridSize;
    const offsetY = (Date.now() * 0.018) % gridSize;
        
        // Vertical lines
        for (let x = -gridSize + offsetX; x < this.canvas.width + gridSize; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = -gridSize + offsetY; y < this.canvas.height + gridSize; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary bouncing
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Mouse interaction
            const mouseDistance = Math.sqrt(
                Math.pow(this.mousePos.x - node.x, 2) + 
                Math.pow(this.mousePos.y - node.y, 2)
            );
            
            if (mouseDistance < 100) {
                const force = (100 - mouseDistance) / 100;
                node.vx += (this.mousePos.x - node.x) * force * 0.001;
                node.vy += (this.mousePos.y - node.y) * force * 0.001;
            }
        });
    }

    drawConnections() {
    this.ctx.setLineDash([8, 12]);
    this.ctx.lineDashOffset = -Date.now() * 0.018;
        this.ctx.strokeStyle = 'rgba(223, 44, 20, 0.4)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(this.nodes[i].x - this.nodes[j].x, 2) +
                    Math.pow(this.nodes[i].y - this.nodes[j].y, 2)
                );

                if (distance < 150) {
                    const opacity = (150 - distance) / 150;
                    this.ctx.strokeStyle = `rgba(223, 44, 20, ${opacity * 0.6})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Reset line dash
        this.ctx.setLineDash([]);
    }

    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.fillStyle = 'rgba(223, 44, 20, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.shadowColor = 'rgba(223, 44, 20, 0.5)';
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    drawScanLines() {
    const time = Date.now() * 0.0013;
        const scanLineY = (Math.sin(time) * 0.5 + 0.5) * this.canvas.height;
        
        // Create dashed line pattern
        this.ctx.setLineDash([15, 10, 5, 10]);
        this.ctx.lineDashOffset = -time * 20;
        
        this.ctx.strokeStyle = 'rgba(123, 175, 0, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, scanLineY);
        this.ctx.lineTo(this.canvas.width, scanLineY);
        this.ctx.stroke();
        
        // Scan line glow
        this.ctx.shadowColor = 'rgba(123, 175, 0, 0.8)';
        this.ctx.shadowBlur = 15;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
        
        // Reset line dash for other elements
        this.ctx.setLineDash([]);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        this.drawScanLines();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize geometric lines on hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        new GeometricLines(heroSection);
    }
});