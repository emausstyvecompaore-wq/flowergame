# Walkthrough — Plateforme d'Images Resplendissantes (Admin Masquer & Dévoiler)

Nous avons transformé et configuré la plateforme pour qu'elle soit entièrement dédiée à l'affichage d'**images au design resplendissant**, avec un contrôle total réservé à l'administrateur pour **publier, masquer et dévoiler** chaque image.

---

## 🚀 Fonctionnalités Implémentées

### 1. 🎨 Design Resplendissant & Immersif
- Cartes dotées d'effets holographiques animés, bordures lumineuses dorées/cyan/holographiques.
- Affichage strict en plein écran mobile sans défilement pour un effet visuel maximal.
- Sonorités Web Audio API magiques lors de la découverte des œuvres.

### 2. 🔐 Sécurité Administrateur (Publication Exclusive)
- L'espace administrateur ([admin.html](file:///C:/Users/COMPAORE%20GUNE/StudioProjects/flowerget/public/admin.html)) est protégé par un mot de passe administrateur sécurisé (PIN par défaut : `admin2024`).
- Seul l'administrateur connecté peut ajouter de nouvelles images resplendissantes et générer leurs QR codes uniques.

### 3. 👁️ Masquage & Révélation en Un Clic
- Chaque image dispose dans l'interface admin de boutons de contrôle d'état :
  - `🔒 Masquer` / `👁️ Dévoiler`
- **Côté public** ([index.html](file:///C:/Users/COMPAORE%20GUNE/StudioProjects/flowerget/public/index.html)) :
  - Si une image est **dévoilée** (`visible: true`), elle apparaît dans toute sa splendeur lors du scan ou de la sélection.
  - Si une image est **masquée** (`visible: false`), l'application affiche un écran sécurisé indiquant que l'image est actuellement masquée par l'administrateur.

---

## 📱 Comment Tester

1. **Lancer le serveur local** :
   ```bash
   node server.js
   ```
2. **Accès Public** : [http://localhost:3000](http://localhost:3000)
3. **Accès Administrateur (Masquer / Dévoiler / Ajouter)** : [http://localhost:3000/admin.html](http://localhost:3000/admin.html) (Mot de passe : `admin2024`)
