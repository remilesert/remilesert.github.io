---
Title : STUDIO TOUR - AURORA
Category : Unity, C#, WebGL, HLSL
Banner : /projects/resources/Fond_Projets.jpg
Date : 09.2021 - 11.2021
Pitch : Visite 360 d'un studio de tournage, accessible depuis un navigateur web
---

# Visite d'un plateau de tournage
À partir d'images 360 prises dans un studio de tournage, nous avons recréé cet environement pour le faire visiter depuis un navigateur web.<br>
Le visiteur peut, à la manière de google streetview, se déplacer de points en points pour visiter l'intégralité du studio.<br>
Nous avons deux points d'interactions possibles, pour lesquel il y a une musique ou un modèle 3D à observer.<br>
J'ai pu organiser et suivre la production, ainsi que réaliser tout le système de déplacement de l'utilsateur (rotation de la caméra et changement entre les points de vues possibles). Cet système de déplacement inclue un shader HLSL pour réaliser un flou directionnel donnant l'impression de mouvement entre deux images fixes. Ce shader permet aussi de repousser les limites de taille de textures imposées par Unity en WebGL, et de visualiser les images 360 en 4k.<br>
