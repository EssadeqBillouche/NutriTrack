# 🥦 NutriTrack – Assistant Nutritionnel Personnalisé

**Auteur :** Zakaria Ziane  
**Créé le :** 21/09/2025  
**Référentiel :** [2023] Concepteur·rice Développeur·se d’Applications

---

## 🌍 Contexte du Projet

**NutriTrack** est une application intelligente qui accompagne les utilisateurs dans la gestion personnalisée de leur nutrition.  
Elle permet un **suivi quotidien des habitudes alimentaires**, une **analyse automatisée des repas** à partir d’images, et une **adaptation dynamique** des recommandations selon les profils (patients chroniques, sportifs, perte ou prise de poids).

L’objectif est de **renforcer l’adhésion thérapeutique** et d’optimiser les performances nutritionnelles grâce à des outils interactifs et des analyses basées sur l’intelligence artificielle.

---

## 🎯 Objectifs Principaux

- Offrir un **plan nutritionnel sur mesure** selon le profil de l’utilisateur.  
- Fournir un **suivi intelligent et continu** de l’alimentation.  
- Intégrer des **alertes personnalisées** pour les pathologies chroniques.  
- Utiliser l’IA pour **analyser les repas via images** et en déduire les nutriments.  
- Générer des **rapports hebdomadaires détaillés** pour le suivi de progression.

---

## 🍽️ Profils Ciblés & Fonctionnalités

### 🩸 **Pathologies Chroniques**
| Pathologie | Objectif | Spécificités |
|-------------|-----------|--------------|
| **Diabète** | Gestion du sucre | Contrôle des glucides & index glycémique |
| **Hypertension** | Limitation du sodium | Alerte repas trop salé |
| **Obésité** | Rééquilibrage progressif | Ajustement calorique & suivi des fibres |

---

### 🏋️ **Athlètes**
- Ajustement du régime selon la **discipline** (endurance / force).  
- Suivi détaillé des **macronutriments** : protéines, glucides, lipides.  
- Recommandations personnalisées pour la **récupération** (électrolytes, protéines rapides).  
- Visualisation de la **progression nutritionnelle vs performance.**

---

### ⚖️ **Perte de Poids**
- Calcul automatique du **déficit calorique contrôlé**.  
- Prévention des **carences nutritionnelles** (vitamines, fibres).  
- Ajustement intelligent du **repas suivant** en cas d’écart.

---

### 💪 **Prise de Masse**
- Gestion du **surplus calorique** adapté.  
- Suivi rigoureux des **protéines et lipides de qualité.**  
- Courbes d’évolution du poids, IMC, et masse musculaire estimée.

---

## 🧠 Analyse des Repas par Image

- **Reconnaissance automatique** des aliments consommés via IA.  
- **Estimation des calories et nutriments** selon le profil (objectif, pathologie, activité).  
- **Détection d’écarts automatiques** :
  - Trop peu de protéines pour un athlète.  
  - Excès de sucre pour un diabétique.  
  - Surplus calorique pour une perte de poids.

---

## ⚙️ Recommandations Dynamiques

- **Athlètes :** conseils pré/post-entraînement, hydratation, récupération.  
- **Patients chroniques :** alertes médicales selon la composition du repas.  
- **Perte/prise de poids :** ajustement automatique du prochain repas selon les écarts.

---

## 📊 Rapports Hebdomadaires

- **Patients :** graphiques sur les écarts glycémiques, excès sel/sucre.  
- **Athlètes :** progression nutritionnelle liée à la performance.  
- **Perte/prise de poids :** évolution du poids, IMC et masse musculaire estimée.

---

## 🏗️ Exigences Techniques

| Domaine | Détails |
|----------|----------|
| **Langage & Environnement** | Node.js + Express.js |
| **Template Engine** | EJS |
| **Architecture** | N-tiers (UI/API, Service/Métier, Persistance) |
| **Persistance** | Requêtes directes ou Query Builders (pas d’ORM) |
| **UI / Frontend** | Frameworks CSS autorisés (Tailwind, Bootstrap, etc.) |
| **Vision / IA** | Pipeline d’analyse d’images via **LangChain** orchestrant **Gemini Flash 1.5** |
| **Gestion de Projet** | Découpage par couches, séparation stricte des responsabilités |


