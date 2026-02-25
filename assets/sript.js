
      // ─── Mobile Menu ─────────────────────────────
      const menuBtn = document.getElementById("menuBtn");
      const mobileMenu = document.getElementById("mobileMenu");
      menuBtn.addEventListener("click", () =>
        mobileMenu.classList.toggle("hidden"),
      );
      document.querySelectorAll("#mobileMenu a").forEach((a) => {
        a.addEventListener("click", () => mobileMenu.classList.add("hidden"));
      });

      // ─── Smooth scroll ───────────────────────────
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const el = document.querySelector(a.getAttribute("href"));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });

      // ─── Typing Effect ───────────────────────────
      const phrases = [
        "Full-Stack Developer",
        "UI/UX Enthusiast",
        "AI Explorer",
        "Open Source Contributor",
        "Problem Solver",
      ];
      let pi = 0,
        ci = 0,
        deleting = false;
      const typedEl = document.getElementById("typedText");
      function type() {
        const full = phrases[pi];
        typedEl.textContent = deleting
          ? full.substring(0, ci--)
          : full.substring(0, ci++);
        if (!deleting && ci > full.length) {
          deleting = true;
          setTimeout(type, 1500);
          return;
        }
        if (deleting && ci < 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
        setTimeout(type, deleting ? 50 : 90);
      }
      type();

      // ─── Skills data ──────────────────────────────
      const skills = [
        { name: "HTML / CSS", icon: "fa-html5", level: 95, color: "#1d6df5" },
        { name: "JavaScript", icon: "fa-js", level: 88, color: "#1d6df5" },
        { name: "React / Next", icon: "fa-react", level: 82, color: "#3d8fff" },
        { name: "Node.js", icon: "fa-node-js", level: 75, color: "#3d8fff" },
        { name: "Python / AI", icon: "fa-python", level: 70, color: "#1d6df5" },
        {
          name: "Git / CI/CD",
          icon: "fa-git-alt",
          level: 85,
          color: "#3d8fff",
        },
      ];
      const barContainer = document.getElementById("skillBars");
      skills.forEach((s) => {
        barContainer.innerHTML += `
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="flex items-center gap-2 text-cyber-light text-sm">
            <i class="fa-brands ${s.icon} text-cyber-blue"></i>${s.name}
          </span>
          <span class="font-mono text-xs text-cyber-gray">${s.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" data-level="${s.level}" style="background:linear-gradient(90deg,${s.color},${s.color}aa)"></div>
        </div>
      </div>`;
      });

      // ─── Intersection Observer ────────────────────
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              // Animate skill bars
              const fills = entry.target.querySelectorAll(".skill-fill");
              fills.forEach((f) => {
                f.style.width = f.dataset.level + "%";
              });
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

      // Also observe skill bars section separately
      const skillSection = document.getElementById("skill");
      const skillIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              document.querySelectorAll(".skill-fill").forEach((f) => {
                f.style.width = f.dataset.level + "%";
              });
              skillIo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      skillIo.observe(skillSection);

      // ─── Contact form ─────────────────────────────
      function handleForm(e) {
        e.preventDefault();
        const msg = document.getElementById("formMsg");
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 4000);
      }

      // ─── Particle Canvas ──────────────────────────
      const canvas = document.getElementById("particles");
      const ctx = canvas.getContext("2d");
      let W,
        H,
        dots = [];

      function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener("resize", resize);

      class Dot {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.r = Math.random() * 1.2 + 0.3;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.a = Math.random() * 0.5 + 0.1;
          this.c = Math.random() > 0.5 ? "29,109,245" : "0,229,160";
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > W || this.y < 0 || this.y > H)
            this.reset();
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.c},${this.a})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < 80; i++) dots.push(new Dot());

      function animate() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach((d) => {
          d.update();
          d.draw();
        });

        // Connect nearby dots
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(dots[i].x, dots[i].y);
              ctx.lineTo(dots[j].x, dots[j].y);
              ctx.strokeStyle = `rgba(29,109,245,${0.08 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(animate);
      }
      animate();