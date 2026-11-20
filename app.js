const $ = (id) => document.getElementById(id);
const pages = ["dashboard","simulation","material","bubble","boiling","history","settings"];
let sessionUser = null;
let cases = [];

function showPage(name) {
  pages.forEach(p => {
    $("page-" + p).classList.toggle("active", p === name);
  });
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page === name));
  const titles = {dashboard:"Dashboard",simulation:"Process simulation",material:"Material balance",bubble:"Bubble point",boiling:"Boiling point",history:"Simulation history",settings:"Settings"};
  $("page-title").textContent = titles[name] || "Dashboard";
  $("crumb").textContent = "WORKSPACE / " + name.toUpperCase();
  $("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}

function enterApp(user) {
  sessionUser = user;
  $("login-screen").classList.add("hidden");
  $("app-shell").classList.remove("hidden");
  $("side-username").textContent = user.username;
  $("side-role").textContent = user.role;
  $("avatar-initial").textContent = user.username.slice(0,1).toUpperCase();
  showPage("dashboard");
}

document.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => showPage(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => showPage(b.dataset.go)));
$("mobile-menu").addEventListener("click", () => $("sidebar").classList.toggle("open"));
$("logout-btn").addEventListener("click", () => {
  sessionUser = null;
  $("app-shell").classList.add("hidden");
  $("login-screen").classList.remove("hidden");
  $("password").value = "";
});
$("today-label").textContent = new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(new Date());

$("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = $("username").value.trim();
  const password = $("password").value;
  if (!username || !password) return;
  $("login-note").textContent = "Backend belum dikonfigurasi. Login belum menerima atau memverifikasi kredensial.";
  $("login-note").style.color = "var(--amber)";
});

$("simulation-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("case-name").value.trim();
  if (!name) return;
  cases.unshift({
    name,
    feed: $("feed-rate").value || "—",
    pressure: $("pressure").value || "—",
    created: new Date().toLocaleString("id-ID"),
    status: "Draft only"
  });
  $("stat-simulations").textContent = cases.length;
  renderHistory();
  $("simulation-form").reset();
  alert("Draft case tersimpan sementara di sesi browser. Belum ada kalkulasi atau penyimpanan ke Google Sheets.");
});

function renderHistory() {
  const body = $("history-body");
  if (!cases.length) {
    body.innerHTML = '<tr><td colspan="5" class="empty-cell">No cases saved in this session.</td></tr>';
    return;
  }
  body.innerHTML = cases.map(c => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.feed)}</td><td>${escapeHtml(c.pressure)}</td><td>${escapeHtml(c.created)}</td><td><span class="tag">${c.status}</span></td></tr>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
$("clear-history").addEventListener("click", () => {
  cases = [];
  $("stat-simulations").textContent = "0";
  renderHistory();
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(err => console.warn("SW registration failed",err)));
}
