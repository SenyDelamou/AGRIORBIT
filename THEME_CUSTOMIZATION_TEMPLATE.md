/* 
 * TEMPLATE DE PERSONNALISATION - AgriOrbit Premium Design
 * 
 * Utilisez ce fichier comme guide pour créer votre propre thème
 * Copiez cet exemple et adaptez-le à vos besoins
 */

/* ============================================
   CRÉER UN NOUVEAU THÈME
   ============================================ */

/* 
 * Étape 1: Créer une nouvelle classe de thème
 * 
 * [data-theme='custom'] {
 *   --bg-deep-space: #000000;
 *   --accent-neon-green: #00FF00;
 *   ... etc
 * }
 * 
 * Étape 2: Appliquer le thème
 * 
 * document.documentElement.setAttribute('data-theme', 'custom');
 */

/* ============================================
   EXEMPLE 1: Thème OCEAN (Bleu/Cyan)
   ============================================ */

/*
[data-theme='ocean'] {
  / Backgrounds /
  --bg-deep-space: #0B1F2D;
  --bg-panel: #0F2835;
  --bg-overlay: rgba(11, 31, 45, 0.8);

  / Accents /
  --accent-neon-green: #00E5FF;  / Cyan vibrant /
  --accent-data-blue: #0DCAF0;   / Cyan light /
  --accent-purple: #17A2B8;      / Teal /
  --accent-satellite-green: #00D4FF;
  --accent-alert: #FF6B6B;

  / Texte /
  --text-primary: #E8F4F8;
  --text-secondary: rgba(232, 244, 248, 0.92);
  --text-muted: rgba(232, 244, 248, 0.7);

  / Glassmorphism /
  --glass-surface: rgba(15, 40, 53, 0.5);
  --glass-surface-deep: rgba(11, 31, 45, 0.7);
  --glass-border: rgba(0, 229, 255, 0.25);

  / Gradients /
  --heading-gradient: linear-gradient(135deg, #E8F4F8 0%, #00E5FF 50%, #0DCAF0 100%);
}
*/

/* ============================================
   EXEMPLE 2: Thème FOREST (Vert/Nature)
   ============================================ */

/*
[data-theme='forest'] {
  / Backgrounds /
  --bg-deep-space: #0B2B1D;
  --bg-panel: #0F3A28;
  --bg-overlay: rgba(11, 43, 29, 0.8);

  / Accents /
  --accent-neon-green: #00FF41;  / Vert électrique /
  --accent-data-blue: #00DD82;   / Vert nature /
  --accent-purple: #1DB854;      / Vert foncé /
  --accent-satellite-green: #2ECC71;
  --accent-alert: #FF6B6B;

  / Texte /
  --text-primary: #E8F8EE;
  --text-secondary: rgba(232, 248, 238, 0.92);
  --text-muted: rgba(232, 248, 238, 0.7);

  / Glassmorphism /
  --glass-surface: rgba(15, 58, 40, 0.5);
  --glass-surface-deep: rgba(11, 43, 29, 0.7);
  --glass-border: rgba(0, 255, 65, 0.25);

  / Gradients /
  --heading-gradient: linear-gradient(135deg, #E8F8EE 0%, #00FF41 50%, #00DD82 100%);
}
*/

/* ============================================
   EXEMPLE 3: Thème SUNSET (Orange/Rose)
   ============================================ */

/*
[data-theme='sunset'] {
  / Backgrounds /
  --bg-deep-space: #2D1B0B;
  --bg-panel: #3A2815;
  --bg-overlay: rgba(45, 27, 11, 0.8);

  / Accents /
  --accent-neon-green: #FFB347;  / Orange clair /
  --accent-data-blue: #FF7F50;   / Coral /
  --accent-purple: #FF6B9D;      / Rose /
  --accent-satellite-green: #FF6348;
  --accent-alert: #FF5252;

  / Texte /
  --text-primary: #FFF5E6;
  --text-secondary: rgba(255, 245, 230, 0.92);
  --text-muted: rgba(255, 245, 230, 0.7);

  / Glassmorphism /
  --glass-surface: rgba(58, 40, 21, 0.5);
  --glass-surface-deep: rgba(45, 27, 11, 0.7);
  --glass-border: rgba(255, 179, 71, 0.25);

  / Gradients /
  --heading-gradient: linear-gradient(135deg, #FFF5E6 0%, #FFB347 50%, #FF7F50 100%);
}
*/

/* ============================================
   EXEMPLE 4: Thème MIDNIGHT (Purple/Dark)
   ============================================ */

/*
[data-theme='midnight'] {
  / Backgrounds /
  --bg-deep-space: #1A0B2E;
  --bg-panel: #2A1845;
  --bg-overlay: rgba(26, 11, 46, 0.8);

  / Accents /
  --accent-neon-green: #D946EF;  / Magenta /
  --accent-data-blue: #A855F7;   / Purple /
  --accent-purple: #9333EA;      / Purple foncé /
  --accent-satellite-green: #C026D3;
  --accent-alert: #FF1744;

  / Texte /
  --text-primary: #F3E8FF;
  --text-secondary: rgba(243, 232, 255, 0.92);
  --text-muted: rgba(243, 232, 255, 0.7);

  / Glassmorphism /
  --glass-surface: rgba(42, 24, 69, 0.5);
  --glass-surface-deep: rgba(26, 11, 46, 0.7);
  --glass-border: rgba(217, 70, 239, 0.25);

  / Gradients /
  --heading-gradient: linear-gradient(135deg, #F3E8FF 0%, #D946EF 50%, #A855F7 100%);
}
*/

/* ============================================
   CRÉER UN THÈME PERSONNALISÉ
   ============================================ */

/*
Étapes:

1. Décidez de votre palette de couleurs principale (3 couleurs)
   Exemple: #00FF41 (vert), #00DD82 (vert clair), #2ECC71 (vert foncé)

2. Créez une classe thème:
   
   [data-theme='my-theme'] {
     --bg-deep-space: #0B2B1D;
     --accent-neon-green: #00FF41;
     --accent-data-blue: #00DD82;
     ... etc
   }

3. Appliquez le thème:
   
   document.documentElement.setAttribute('data-theme', 'my-theme');

4. Testez sur tous les composants

5. Ajustez jusqu'à satisfaction
*/

/* ============================================
   GUIDE DE COULEURS HARMONIEUSES
   ============================================ */

/*
PALETTE MONOCHROMATIQUE (Une couleur)
  - Utiliser différentes saturations/luminosité
  - Exemple: #FF6B00, #FF8C00, #FFA500, #FFB700

PALETTE COMPLÉMENTAIRE (Deux couleurs opposées)
  - Exemple: Bleu (#0000FF) + Orange (#FF8C00)

PALETTE TRIADIQUE (Trois couleurs équidistantes)
  - Exemple: Bleu (#0000FF), Jaune (#FFFF00), Rouge (#FF0000)

PALETTE ANALOGUE (Couleurs voisines)
  - Exemple: Bleu (#0000FF), Violet (#8000FF), Magenta (#FF00FF)

PALETTE WARM (Couleurs chaudes)
  - Reds, Oranges, Yellows
  - Pour: Energy, warmth, creativity

PALETTE COOL (Couleurs froides)
  - Blues, Greens, Purples
  - Pour: Calm, trust, professionalism

PALETTE VIBRANT (Couleurs saturées)
  - Pour: Modern, energetic, dynamic

PALETTE MUTED (Couleurs moins saturées)
  - Pour: Professional, elegant, sophisticated
*/

/* ============================================
   OUTILS RECOMMANDÉS
   ============================================ */

/*
Pour créer votre palette:

1. Adobe Color Wheel
   https://color.adobe.com/

2. Coolors.co
   https://coolors.co/

3. Color Hunt
   https://colorhunt.co/

4. Palette Generator
   https://chir.ag/projects/ntalkbar/

5. Happy Hues
   https://www.happyhues.co/

Pour tester l'accessibilité:

6. WebAIM Contrast Checker
   https://webaim.org/resources/contrastchecker/

7. Contrast Ratio
   https://contrast-ratio.com/
*/

/* ============================================
   CHECKLIST DE PERSONNALISATION
   ============================================ */

/*
□ Choisir couleur primaire (accent-neon-green)
□ Choisir couleur secondaire (accent-data-blue)
□ Choisir couleur de succès (accent-satellite-green)
□ Choisir couleurs backgrounds
□ Vérifier contraste (WCAG AA minimum)
□ Tester sur dark mode
□ Tester sur light mode
□ Vérifier sur tous les composants
□ Tester sur mobile
□ Tester sur navigateurs différents
□ Documentation mise à jour
*/

/* ============================================
   EXEMPLE DE CODE POUR APPLIQUER LE THÈME
   ============================================ */

/*
// Dans votre composant theme switcher:

const themes = {
  'default': { label: 'Default', colors: [...] },
  'ocean': { label: 'Ocean', colors: [...] },
  'forest': { label: 'Forest', colors: [...] },
  'sunset': { label: 'Sunset', colors: [...] },
  'midnight': { label: 'Midnight', colors: [...] }
};

function ThemeSwitcher() {
  const [theme, setTheme] = React.useState('default');
  
  const switchTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  
  return (
    <select onChange={(e) => switchTheme(e.target.value)}>
      {Object.entries(themes).map(([key, { label }]) => (
        <option key={key} value={key}>{label}</option>
      ))}
    </select>
  );
}
*/

/* ============================================
   RESSOURCES SUPPLÉMENTAIRES
   ============================================ */

/*
Pour en savoir plus:

- Color Theory: https://99designs.com/blog/tips/color-theory/
- Web Accessibility: https://www.a11yproject.com/
- CSS Variables Guide: https://web.dev/css-variables/
- Color Psychology: https://www.interaction-design.org/literature/topics/color-psychology

Documentation AgriOrbit:
- DESIGN_SYSTEM.md - Guide complet
- CSS_VARIABLES.css - Référence variables
- EXAMPLES.md - Exemples d'utilisation
*/

/* ============================================
   NOTES
   ============================================ */

/*
Conseils:
✓ Testez les couleurs dans le contexte réel
✓ Utiliser au minimum 3 teintes par couleur
✓ Vérifier accessibilité (contrast ratio >= 4.5:1)
✓ Rester cohérent avec la palette
✓ Tester avec colorblind-friendly checker
✓ Demander feedback sur le design
✓ Itérer et améliorer

À éviter:
✗ Trop de couleurs différentes
✗ Couleurs qui clignotent
✗ Contraste insuffisant
✗ Couleurs flash/seizure-prone
✗ Ignorer l'accessibilité
*/
