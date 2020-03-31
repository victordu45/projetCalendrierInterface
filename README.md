# projetCalendrierInterface
C'est l'interface

# Variable d'environnement à ajouter sur la raspberry
export NODE_OPTIONS="--max-old-space-size=512"

# Ajouter du swap au raspberry 
sudo dphys-swapfile swapoff
nano /etc/dphys-swapfile 
  CONF_SWAPSIZE=2048
sudo dphys-swapfile swapon
