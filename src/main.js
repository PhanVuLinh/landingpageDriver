import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, MAP_EMBED_URL, MAP_LINK_URL, TRUCK_IMAGE, TRUCK_IMAGE_URL } from "./content.js";
import truckSvg from "./truck.svg?raw";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const phone = content.site.phone.replace(/\D/g, "");
const telUrl = `tel:${phone}`;
const zaloUrl = `https://zalo.me/${phone}`;
const $ = (selector) => document.querySelector(selector);

// Thiết lập thông tin SEO và Meta
document.title = content.site.title;
$("meta[name='description']").content = content.site.description;
$("link[rel='canonical']").href = content.site.canonical;
$("meta[property='og:title']").content = content.site.title;
$("meta[property='og:description']").content = content.site.description;
$("meta[property='og:url']").content = content.site.canonical;
$("meta[property='og:image']").content = content.site.socialImage;
$("meta[name='twitter:title']").content = content.site.title;
$("meta[name='twitter:description']").content = content.site.description;
$("meta[name='twitter:image']").content = content.site.socialImage;

// 01 Hero Section
$("#hero-kicker").textContent = content.hero.kicker;
$("#hero-title").textContent = content.hero.title;
$("#hero-description").textContent = content.hero.description;
$("#hero-note").textContent = content.hero.note;
$("#hero-actions").innerHTML = `
  <a class="button button-primary js-contact" data-contact="call" href="${telUrl}">
    <span>${content.hero.callLabel}</span><span class="button-icon" aria-hidden="true">↗</span>
  </a>
  <a class="button button-secondary js-contact" data-contact="zalo" href="${zaloUrl}" target="_blank" rel="noopener noreferrer">
    <span>${content.hero.zaloLabel}</span><span class="button-icon" aria-hidden="true">↗</span>
  </a>`;

// 02 Dịch vụ
$("#services-title").textContent = content.services.title;
$("#services-intro").textContent = content.services.intro;
$("#service-list").innerHTML = content.services.items.map((item) => `
  <article class="service-card">
    <span class="card-number">${item.number}</span>
    <div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
    <span class="card-arrow" aria-hidden="true">↗</span>
  </article>`).join("");

// 03 Chiếc xe (Showcase)
$("#vehicle-title").textContent = content.vehicle.title;
$("#vehicle-intro").textContent = content.vehicle.intro;
$("#spec-list").innerHTML = content.vehicle.specs.map((spec, index) => `
  <div class="spec-row">
    <span class="spec-index">0${index + 1}</span>
    <span class="spec-label">${spec.label}</span>
    <strong>${spec.value}</strong>
  </div>`).join("");
$("#vehicle-caption").textContent = content.vehicle.caption;

// 04 Khu vực & Bản đồ (Lazy loading khi cuộn gần đến)
$("#area-title").textContent = content.area.title;
$("#area-intro").textContent = content.area.intro;
$("#area-location").textContent = content.area.location;

const mapFrame = $("#map-frame");
$("#map-link").href = MAP_LINK_URL;
$("#map-link").innerHTML = `Mở bản đồ trên Google Maps <span aria-hidden="true">↗</span>`;

if (mapFrame) {
  const loadMap = () => {
    if (!mapFrame.getAttribute("src")) {
      mapFrame.src = MAP_EMBED_URL;
    }
  };
  const mapObserver = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      loadMap();
      mapObserver.disconnect();
    }
  }, { rootMargin: "300px" });
  const areaSection = $("#khu-vuc");
  if (areaSection) {
    mapObserver.observe(areaSection);
  } else {
    loadMap();
  }
}

// 05 Đặt xe
$("#steps-title").textContent = content.steps.title;
$("#steps-intro").textContent = content.steps.intro;
$("#steps-list").innerHTML = content.steps.items.map((step, index) => `
  <li class="step-item">
    <span class="step-number">0${index + 1}</span>
    <div>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </div>
  </li>`).join("");
$("#steps-after").textContent = content.steps.after;

// 06 Liên hệ
$("#contact-kicker").textContent = content.contact.kicker;
$("#contact-title").textContent = content.contact.title;
$("#contact-intro").textContent = content.contact.intro;
$("#big-phone").textContent = content.site.phone;
$("#contact-area-note").textContent = content.contact.areaNote;
$("#footer-name").textContent = `© ${new Date().getFullYear()} ${content.site.name}`;
$("#contact-actions").innerHTML = `
  <a class="button button-light js-contact" data-contact="call" href="${telUrl}">
    <span>${content.contact.callLabel}</span><span class="button-icon" aria-hidden="true">↗</span>
  </a>
  <a class="button button-darkline js-contact" data-contact="zalo" href="${zaloUrl}" target="_blank" rel="noopener noreferrer">
    <span>${content.contact.zaloLabel}</span><span class="button-icon" aria-hidden="true">↗</span>
  </a>`;

// Thanh liên hệ cố định trên mobile
$("#mobile-contact").innerHTML = `
  <a class="mobile-button js-contact" data-contact="call" href="${telUrl}">
    <span aria-hidden="true">↗</span>${content.contact.mobileCall}
  </a>
  <a class="mobile-button mobile-button--zalo js-contact" data-contact="zalo" href="${zaloUrl}" target="_blank" rel="noopener noreferrer">
    <span aria-hidden="true">↗</span>${content.contact.mobileZalo}
  </a>`;

// Xử lý sự kiện click liên hệ
document.querySelectorAll(".js-contact").forEach((link) => {
  link.href = link.dataset.contact === "zalo" ? zaloUrl : telUrl;
  link.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: link.dataset.contact
      });
    }
  });
});

// JSON-LD Schema
const schema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: content.site.name,
  telephone: `+84${phone.slice(1)}`,
  url: content.site.canonical,
  image: content.site.socialImage,
  areaServed: { "@type": "AdministrativeArea", name: content.site.areaServed },
  address: { "@type": "PostalAddress", addressRegion: content.site.areaServed, addressCountry: "VN" },
  geo: { "@type": "GeoCoordinates", latitude: content.site.coordinates.latitude, longitude: content.site.coordinates.longitude }
};
const schemaTag = document.createElement("script");
schemaTag.type = "application/ld+json";
schemaTag.textContent = JSON.stringify(schema);
document.head.append(schemaTag);

// CẤU HÌNH XE TẢI (TRUCK_IMAGE hoặc SVG vẽ tay Thaco Ollin 500B)
const truck = $("#truck-art");
const truckStage = $("#truck-stage");
const resolvedTruckImage = TRUCK_IMAGE || TRUCK_IMAGE_URL;

truck.innerHTML = resolvedTruckImage
  ? `<img class="truck-photo" src="${resolvedTruckImage}" alt="Xe tải Đình Thư, Thaco Ollin 500B" fetchpriority="high" />
     <svg class="photo-wheels" viewBox="0 0 900 440" focusable="false">
       <g class="wheel wheel--photo wheel-photo--one"><circle cx="173" cy="347" r="50"/><circle class="hub" cx="173" cy="347" r="19"/><path d="M173 301v92m-46-46h92m-78-32 64 64m0-64-64 64"/></g>
       <g class="wheel wheel--photo wheel-photo--two"><circle cx="689" cy="347" r="50"/><circle class="hub" cx="689" cy="347" r="19"/><path d="M689 301v92m-46-46h92m-78-32 64 64m0-64-64 64"/></g>
     </svg>`
  : truckSvg;

const panels = [...document.querySelectorAll("[data-panel]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageWash = $(".page-wash");
const horizonLayer = $(".journey-layer--horizon");
const landscapeLayer = $(".journey-layer--landscape");
const roadDashes = $(".road-dashes");
const foregroundLayer = $(".journey-layer--foreground");

const colorStops = [
  "#f2ebe0", // Hero · cát
  "#f2ad87", // Dịch vụ · cam
  "#e8d27d", // Xe · vàng cát
  "#b9d6c4", // Khu vực · xanh sage
  "#d9dce0", // Đặt xe · trắng xám
  "#18342d"  // Liên hệ · xanh đậm
];

// TỌA ĐỘ XE: XE LUÔN BÁM MẶT ĐƯỜNG, BỎ HOÀN TOÀN ROTATE VÀ THAY ĐỔI Y THEO VH
// Chỉ dịch ngang (trục x tính theo vw) giữa các section
const truckStopsDesktop = [
  { x: 62 }, // Hero: làn xe bên phải
  { x: 66 }, // Dịch vụ: lướt ngang sang phải
  { x: 54 }, // Chiếc xe: showcase (phóng to nhẹ theo CSS .in-showcase)
  { x: 68 }, // Khu vực: lướt ngang sang phải, nhường chỗ thoáng cho bản đồ
  { x: 63 }, // Đặt xe: làn xe bên phải
  { x: 65 }  // Liên hệ: làn xe bên phải
];

const truckStopsMobile = [
  { x: 50 },
  { x: 52 },
  { x: 50 },
  { x: 48 },
  { x: 51 },
  { x: 50 }
];

function setInkForBackground(hex) {
  const rgb = hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const ink = luminance > 0.179 ? "#000000" : "#ffffff";
  document.documentElement.style.setProperty("--ink", ink);
  document.documentElement.style.setProperty("--paper", hex);
  const metaTheme = document.querySelector("meta[name='theme-color']");
  if (metaTheme) metaTheme.content = hex;
}

function interpolateColor(from, to, amount) {
  const left = from.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16));
  const right = to.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16));
  return `#${left.map((value, index) => Math.round(value + (right[index] - value) * amount).toString(16).padStart(2, "0")).join("")}`;
}

setInkForBackground(colorStops[0]);

// KIỂM TRA VA CHẠM HỘP BAO (AABB COLLISION CHECK)
const collisionTargetsSelector = `
  h1, h2, h3,
  .hero-actions, .contact-actions, .button,
  .big-phone, .map-frame-wrap, #map-frame,
  .header-call, .mobile-contact, .desktop-nav, .brand,
  .service-card, .step-item, .spec-list
`;

let cachedTargets = [];
function updateCollisionTargets() {
  cachedTargets = Array.from(document.querySelectorAll(collisionTargetsSelector));
}
updateCollisionTargets();

function checkCollision() {
  if (!truckStage) return;
  const tRect = truckStage.getBoundingClientRect();
  if (tRect.width === 0 || tRect.height === 0) return;

  const margin = 3;
  let hasCollision = false;

  for (let i = 0; i < cachedTargets.length; i++) {
    const el = cachedTargets[i];
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > window.innerWidth) {
      continue;
    }

    const intersect = !(
      r.right < tRect.left + margin ||
      r.left > tRect.right - margin ||
      r.bottom < tRect.top + margin ||
      r.top > tRect.bottom - margin
    );

    if (intersect) {
      hasCollision = true;
      break;
    }
  }

  if (hasCollision) {
    truckStage.classList.add("truck-colliding");
  } else {
    truckStage.classList.remove("truck-colliding");
  }
}

// BẬT / TẮT RUNG THÂN XE KHI CUỘN (KHI DỪNG CUỘN THÌ ĐỨNG YÊN HOÀN TOÀN)
let scrollStopTimer;
function handleScrollRolling() {
  if (reducedMotion) return;
  if (truckStage) {
    truckStage.classList.add("truck-rolling");
  }
  clearTimeout(scrollStopTimer);
  scrollStopTimer = setTimeout(() => {
    if (truckStage) {
      truckStage.classList.remove("truck-rolling");
    }
  }, 120);
}

let collisionScheduled = false;
function requestCollisionCheck() {
  if (collisionScheduled) return;
  collisionScheduled = true;
  requestAnimationFrame(() => {
    checkCollision();
    collisionScheduled = false;
  });
}

function startCollisionCheck() {
  window.addEventListener("scroll", () => {
    handleScrollRolling();
    requestCollisionCheck();
  }, { passive: true });
  window.addEventListener("resize", requestCollisionCheck, { passive: true });
  requestCollisionCheck();
}

if (reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (active) {
      const index = panels.indexOf(active.target);
      setInkForBackground(colorStops[index]);
      if (active.target.id === "xe") {
        document.body.classList.add("in-showcase");
      } else {
        document.body.classList.remove("in-showcase");
      }
    }
  }, { threshold: [0.25, 0.5, 0.75] });
  panels.forEach((panel) => observer.observe(panel));
  startCollisionCheck();
} else {
  setupScrollMotion();
  startCollisionCheck();
}

function setupScrollMotion() {
  // Bánh xe quay theo quãng đường cuộn, đúng chiều kim đồng hồ khi tiến về trước
  const wheelSelector = ".wheel--one, .wheel--two, .wheel--photo";
  gsap.to(wheelSelector, {
    rotation: 1200,
    transformOrigin: "center",
    ease: "none",
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true
    }
  });

  const drive = { progress: 0 };
  const readStops = () => {
    const isMobile = window.innerWidth <= 760;
    const stopsList = isMobile ? truckStopsMobile : truckStopsDesktop;
    return panels.map((panel, index) => ({
      center: panel.offsetTop + panel.offsetHeight / 2,
      id: panel.id,
      color: colorStops[index],
      ...stopsList[index]
    }));
  };

  const updateDrive = () => {
    handleScrollRolling();
    const stops = readStops();
    const main = $("main");
    const scrollDistance = Math.max(0, main.offsetHeight - window.innerHeight);
    const viewportCenter = main.offsetTop + drive.progress * scrollDistance + window.innerHeight / 2;

    let left = stops[0];
    let right = stops[stops.length - 1];
    for (let index = 1; index < stops.length; index += 1) {
      if (viewportCenter <= stops[index].center) {
        left = stops[index - 1];
        right = stops[index];
        break;
      }
      left = stops[index];
    }

    const progress = left === right ? 0 : gsap.utils.clamp(0, 1, (viewportCenter - left.center) / (right.center - left.center));
    const color = interpolateColor(left.color, right.color, progress);
    setInkForBackground(color);
    gsap.set(pageWash, { backgroundColor: color });

    // Kiểm tra và bật/tắt chế độ showcase xe
    const activeSection = progress > 0.5 ? right : left;
    if (activeSection.id === "xe") {
      document.body.classList.add("in-showcase");
    } else {
      document.body.classList.remove("in-showcase");
    }

    // TÍNH TOÁN VỊ TRÍ X CỦA XE (XE LUÔN BÁM ĐƯỜNG TRÊN TRỤC Y, KHÔNG XOAY GÓC)
    const currentX = gsap.utils.interpolate(left.x, right.x, progress);
    document.documentElement.style.setProperty("--truck-x", `${currentX}vw`);

    // PHỐI CẢNH ĐA LỚP (XA CHẬM, GẦN NHANH)
    // 1. Đồi mờ: di chuyển rất chậm
    if (horizonLayer) {
      gsap.set(horizonLayer, { x: -drive.progress * 110 });
    }
    // 2. Cột điện & hàng cây: di chuyển chậm hơn xe
    if (landscapeLayer) {
      gsap.set(landscapeLayer, { x: -drive.progress * 260 });
    }
    // 3. Vạch đứt trắng: chạy ngược chiều cuộn, nhanh hơn xe
    if (roadDashes) {
      gsap.set(roadDashes, { x: -(drive.progress * 1800) % 82 });
    }
    // 4. Lớp trước: lướt nhanh hơn
    if (foregroundLayer) {
      gsap.set(foregroundLayer, { x: -drive.progress * 420 });
    }

    requestCollisionCheck();
  };

  gsap.to(drive, {
    progress: 1,
    duration: 1,
    ease: "none",
    onUpdate: updateDrive,
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        drive.progress = self.progress;
        updateDrive();
      }
    }
  });

  updateDrive();

  window.addEventListener("resize", () => {
    updateCollisionTargets();
    ScrollTrigger.refresh();
  }, { passive: true });

  document.fonts?.ready.then(() => {
    updateCollisionTargets();
    ScrollTrigger.refresh();
  });

  // Hỗ trợ kiểm thử tự động theo từng section & vị trí start/mid/end
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("scrollSec")) {
    const secId = urlParams.get("scrollSec");
    const pos = urlParams.get("scrollPos") || "start";
    const performScroll = () => {
      const targetSec = document.getElementById(secId);
      if (targetSec) {
        let scrollY = targetSec.offsetTop;
        if (pos === "mid") {
          scrollY = targetSec.offsetTop + (targetSec.offsetHeight - window.innerHeight) / 2;
        } else if (pos === "end") {
          scrollY = targetSec.offsetTop + targetSec.offsetHeight - window.innerHeight;
        }
        window.scrollTo(0, Math.max(0, scrollY));
        ScrollTrigger.refresh();
        requestCollisionCheck();
      }
    };
    window.addEventListener("load", () => setTimeout(performScroll, 80));
    setTimeout(performScroll, 160);
  }

  window.__CHECK_STATUS__ = () => {
    checkCollision();
    const overflowX = document.documentElement.scrollWidth > window.innerWidth;
    const isColliding = truckStage ? truckStage.classList.contains("truck-colliding") : false;
    return {
      overflowX,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      isColliding
    };
  };
}
