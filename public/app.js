// Logique de la plateforme Biscuits Legends — Images Resplendissantes (Admin Masquer/Dévoiler)

document.addEventListener("DOMContentLoaded", () => {
  let allCharacters = [];
  let userUnlocked = JSON.parse(localStorage.getItem("biscuit_collection") || "[]");
  let userVotes = JSON.parse(localStorage.getItem("biscuit_votes") || "{}");
  let currentCharacter = null;
  let albumPage = 0;

  // Web Audio API pour le son magique de dévoilement
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function playChime(type = "reveal") {
    try {
      if (!audioCtx) audioCtx = new AudioCtx();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "reveal") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === "vote") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {}
  }

  // Chargement des personnages / images depuis l'API ou le fallback local
  async function initApp() {
    try {
      const res = await fetch("/api/cards");
      const serverCards = await res.json();
      if (serverCards && serverCards.length > 0) {
        allCharacters = serverCards.map((c, index) => {
          const defaultChar = CHARACTERS[index % CHARACTERS.length];
          let artHtml = '';
          if (c.image) {
            artHtml = `<img src="${c.image}" class="character-real-img" alt="${c.name}">`;
          } else if (defaultChar && defaultChar.avatarSvg) {
            artHtml = defaultChar.avatarSvg;
          } else {
            artHtml = `<div style="font-size:4rem;">✨</div>`;
          }

          return {
            id: c.id,
            code: c.code || `BISCUIT-${c.number || index + 1}`,
            number: c.number || String(index + 1).padStart(2, '0'),
            name: c.name,
            title: c.title || 'Trésor Resplendissant',
            rarity: c.rarity || 'Rare',
            rarityClass: c.rarityClass || 'rare',
            image: c.image || '',
            quote: c.quote || 'Une œuvre resplendissante entre dans la légende !',
            power: c.power || 'Éclat Divin',
            kingdom: c.kingdom || 'Royaumes d\'Amani',
            votes: c.votes || 0,
            visible: c.visible !== false,
            avatarSvg: artHtml
          };
        });
      } else {
        allCharacters = CHARACTERS.map(c => ({ ...c, visible: true }));
      }
    } catch (e) {
      allCharacters = CHARACTERS.map(c => ({ ...c, visible: true }));
    }

    const initialCharacter = detectCodeFromUrl();
    displaySingleCharacter(initialCharacter, true);
    setupUI();
  }

  function detectCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || params.get("c") || params.get("id");

    if (code) {
      const clean = code.trim().toLowerCase();
      const found = allCharacters.find(
        c => c.code.toLowerCase() === clean || c.id.toLowerCase() === clean
      );
      if (found) return found;
    }
    return allCharacters[0] || CHARACTERS[0];
  }

  // Affichage STRICTEMENT d'une seule image à la fois (Gère le masquage par l'admin)
  function displaySingleCharacter(character, isScanAction = false) {
    currentCharacter = character;
    const container = document.getElementById("singleCardContainer");
    const btnVote = document.getElementById("btnVote");

    // Si l'image est masquée par l'administrateur (visible: false)
    if (character.visible === false) {
      container.innerHTML = `
        <div class="card-wrapper ${isScanAction ? "revealing" : ""}" id="activeCardWrapper">
          <div class="character-card rare" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 28px; background: #0f172a; border-color: #ef4444;">
            <div style="font-size: 4rem; margin-bottom: 16px;">🔒</div>
            <h2 style="color: #fca5a5; font-size: 1.3rem; margin-bottom: 8px;">Image Actuellement Masquée</h2>
            <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.4; margin-bottom: 20px;">
              Cette œuvre resplendissante a été masquée par l'administrateur. Revenez plus tard pour sa révélation !
            </p>
            <div class="badge-code">${character.code}</div>
          </div>
        </div>
      `;
      btnVote.style.display = "none";
      updateCollectionPill();
      return;
    }

    // Sinon, image dévoilée en plein éclat
    btnVote.style.display = "flex";

    // Ajouter à la collection si non présent
    if (!userUnlocked.includes(character.id)) {
      userUnlocked.push(character.id);
      localStorage.setItem("biscuit_collection", JSON.stringify(userUnlocked));
    }

    updateCollectionPill();

    const votesCount = (character.votes || 0) + (userVotes[character.id] || 0);
    const hasVoted = Boolean(userVotes[character.id]);

    container.innerHTML = `
      <div class="card-wrapper ${isScanAction ? "revealing" : ""}" id="activeCardWrapper">
        <div class="character-card ${character.rarityClass}">
          <div class="card-hologram"></div>
          
          <div class="card-top">
            <span class="rarity-tag ${character.rarityClass}">${character.rarity}</span>
            <span class="card-number">#${character.number} / ${allCharacters.length}</span>
          </div>

          <div class="card-art">
            ${character.avatarSvg}
          </div>

          <div class="card-info">
            <h2 class="character-name">
              <span>${character.name}</span>
              <span class="character-votes" id="voteCountBadge">❤️ ${votesCount}</span>
            </h2>
            <div class="character-title">${character.title}</div>
            <div class="character-quote">« ${character.quote} »</div>
            
            <div class="character-meta">
              <span class="meta-pill">✨ ${character.power}</span>
              <span class="meta-pill">🌍 ${character.kingdom}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (hasVoted) {
      btnVote.classList.add("voted");
      btnVote.innerHTML = `<span>✅ Voté ! (${votesCount} voix)</span>`;
    } else {
      btnVote.classList.remove("voted");
      btnVote.innerHTML = `<span>❤️ Voter pour la série animée (+1 voix)</span>`;
    }

    if (isScanAction) {
      playChime("reveal");
    }
  }

  function updateCollectionPill() {
    const pill = document.getElementById("collectionPill");
    const visibleUnlocked = userUnlocked.filter(id => {
      const c = allCharacters.find(item => item.id === id);
      return c && c.visible !== false;
    });
    pill.innerHTML = `<span>📚 Album : ${visibleUnlocked.length}/${allCharacters.filter(c => c.visible !== false).length}</span>`;
  }

  function setupUI() {
    // Vote
    const btnVote = document.getElementById("btnVote");
    btnVote.addEventListener("click", () => {
      if (!currentCharacter || currentCharacter.visible === false) return;

      if (!userVotes[currentCharacter.id]) {
        userVotes[currentCharacter.id] = 1;
        localStorage.setItem("biscuit_votes", JSON.stringify(userVotes));
        playChime("vote");

        const votesCount = (currentCharacter.votes || 0) + 1;
        btnVote.classList.add("voted");
        btnVote.innerHTML = `<span>✅ Voix enregistrée ! (${votesCount})</span>`;

        const badge = document.getElementById("voteCountBadge");
        if (badge) badge.innerHTML = `❤️ ${votesCount}`;
      }
    });

    // Album Modal
    const albumModal = document.getElementById("albumModal");
    const btnOpenAlbum = document.getElementById("btnOpenAlbum");
    const btnCloseAlbum = document.getElementById("btnCloseAlbum");
    const pillAlbum = document.getElementById("collectionPill");

    function openAlbum() {
      renderAlbumPage(albumPage);
      albumModal.classList.add("active");
    }

    function closeAlbum() {
      albumModal.classList.remove("active");
    }

    pillAlbum.addEventListener("click", openAlbum);
    btnOpenAlbum.addEventListener("click", openAlbum);
    btnCloseAlbum.addEventListener("click", closeAlbum);

    function renderAlbumPage(page) {
      const grid = document.getElementById("albumGrid");
      // Ne montrer que les cartes visibles par le public
      const publicCards = allCharacters.filter(c => c.visible !== false);
      const startIndex = page * 6;
      const pageChars = publicCards.slice(startIndex, startIndex + 6);
      const totalPages = Math.max(1, Math.ceil(publicCards.length / 6));

      document.getElementById("albumPageIndicator").innerText = `Page ${page + 1} / ${totalPages}`;

      grid.innerHTML = pageChars
        .map(char => {
          const isUnlocked = userUnlocked.includes(char.id);
          if (isUnlocked) {
            return `
              <div class="album-slot unlocked ${char.rarityClass}" data-id="${char.id}">
                <span class="slot-number">#${char.number}</span>
                <div class="slot-thumbnail">
                  ${char.avatarSvg}
                </div>
                <div class="slot-name">${char.name}</div>
              </div>
            `;
          } else {
            return `
              <div class="album-slot locked" title="Scannez pour débloquer !">
                <span class="slot-number">#${char.number}</span>
                <div class="slot-thumbnail">
                  <span class="locked-icon">🔒</span>
                </div>
                <div class="slot-name">Mystère</div>
              </div>
            `;
          }
        })
        .join("");

      grid.querySelectorAll(".album-slot.unlocked").forEach(slot => {
        slot.addEventListener("click", () => {
          const charId = slot.getAttribute("data-id");
          const found = allCharacters.find(c => c.id === charId);
          if (found) {
            closeAlbum();
            displaySingleCharacter(found, false);
          }
        });
      });
    }

    document.getElementById("btnPrevPage").addEventListener("click", () => {
      if (albumPage > 0) {
        albumPage--;
        renderAlbumPage(albumPage);
      }
    });

    document.getElementById("btnNextPage").addEventListener("click", () => {
      const publicCards = allCharacters.filter(c => c.visible !== false);
      const totalPages = Math.ceil(publicCards.length / 6);
      if (albumPage < totalPages - 1) {
        albumPage++;
        renderAlbumPage(albumPage);
      }
    });

    // Scanner / Simulateur Modal
    const scanModal = document.getElementById("scanModal");
    const btnOpenScan = document.getElementById("btnOpenScan");
    const btnCloseScan = document.getElementById("btnCloseScan");

    btnOpenScan.addEventListener("click", () => scanModal.classList.add("active"));
    btnCloseScan.addEventListener("click", () => scanModal.classList.remove("active"));

    const quickSelect = document.getElementById("quickSelect");
    const visibleCards = allCharacters.filter(c => c.visible !== false);
    quickSelect.innerHTML = `<option value="">-- Choisir une image à afficher --</option>` +
      visibleCards.map(c => `<option value="${c.id}">Œuvre #${c.number} : ${c.name} (${c.rarity})</option>`).join("");

    quickSelect.addEventListener("change", (e) => {
      const charId = e.target.value;
      if (charId) {
        const found = allCharacters.find(c => c.id === charId);
        if (found) {
          scanModal.classList.remove("active");
          displaySingleCharacter(found, true);
          const newUrl = `${window.location.pathname}?code=${found.code}`;
          window.history.pushState({ path: newUrl }, "", newUrl);
        }
      }
    });

    // QR Codes Modal
    const qrModal = document.getElementById("qrModal");
    const btnOpenQR = document.getElementById("btnOpenQR");
    const btnCloseQR = document.getElementById("btnCloseQR");

    btnOpenQR.addEventListener("click", () => {
      renderQRCodePreview(currentCharacter || visibleCards[0] || allCharacters[0]);
      qrModal.classList.add("active");
    });
    btnCloseQR.addEventListener("click", () => qrModal.classList.remove("active"));

    const qrSelect = document.getElementById("qrSelect");
    qrSelect.innerHTML = visibleCards.map(c => `<option value="${c.id}">QR : ${c.name} (#${c.number})</option>`).join("");

    qrSelect.addEventListener("change", (e) => {
      const found = allCharacters.find(c => c.id === e.target.value);
      if (found) renderQRCodePreview(found);
    });

    function renderQRCodePreview(char) {
      const origin = (window.location.origin && window.location.origin !== "null" && !window.location.origin.startsWith("file"))
        ? window.location.origin
        : "http://localhost:3000";
      const targetUrl = `${origin}/?code=${char.code}`;
      const svg = window.QRCodeGenerator.generateSVG(targetUrl, 200);
      document.getElementById("qrCodeContainer").innerHTML = svg;
      document.getElementById("qrLabelText").innerText = `#${char.number} - ${char.name} (${char.code})`;
      document.getElementById("qrTargetUrl").innerText = targetUrl;
    }
  }

  initApp();
});
