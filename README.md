# Tips

#### Para correr node en el puerto 80 sin permisos de administrador
```bash
  $ sudo apt-get install libcap2-bin
  $ sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```