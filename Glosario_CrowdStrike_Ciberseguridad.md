# Glosario de Ciberseguridad y CrowdStrike Falcon

---

## 1. Conceptos Base de Ciberseguridad

### Amenazas y Ataques

| Termino (EN) | Termino (ES) | Explicacion |
|---|---|---|
| **Malware** | Software malicioso | Cualquier programa disenado para hacer dano: virus, troyanos, ransomware, etc. |
| **Ransomware** | Secuestro de datos | Malware que cifra tus archivos y pide un rescate (dinero) para devolvertelos. |
| **Phishing** | Suplantacion / Pesca | Correos o webs falsas que imitan ser legitimas para robarte credenciales o datos. |
| **Exploit** | Explotacion | Codigo o tecnica que aprovecha una vulnerabilidad conocida en un software. |
| **Zero-day** | Dia cero | Vulnerabilidad que nadie conocia hasta ahora, no tiene parche todavia. Es la mas peligrosa porque no hay defensa preparada. |
| **Lateral Movement** | Movimiento lateral | Cuando un atacante ya entro a un equipo y se mueve a otros equipos dentro de la red. |
| **Privilege Escalation** | Escalada de privilegios | El atacante consigue permisos de administrador partiendo de un usuario normal. |
| **Brute Force** | Fuerza bruta | Probar miles de combinaciones de contrasenas hasta dar con la correcta. |
| **Social Engineering** | Ingenieria social | Manipular a personas (no maquinas) para que revelen informacion o hagan algo peligroso. |
| **Supply Chain Attack** | Ataque a la cadena de suministro | Atacar un proveedor de software para infectar a todos sus clientes de golpe. |
| **Fileless Attack** | Ataque sin archivos | Ataque que no deja archivos en disco, se ejecuta en memoria. Mas dificil de detectar. |

### Indicadores y Deteccion

| Termino (EN) | Termino (ES) | Explicacion |
|---|---|---|
| **IOC** (Indicator of Compromise) | Indicador de compromiso | Evidencia de que ya ocurrio un ataque: un hash de archivo malicioso, una IP sospechosa, un dominio conocido como malicioso. Es reactivo (mira el pasado). |
| **IOA** (Indicator of Attack) | Indicador de ataque | Patron de comportamiento que indica que un ataque esta ocurriendo AHORA, sin importar que herramienta use el atacante. Es proactivo (mira el presente). **CrowdStrike se enfoca mucho en IOAs.** |
| **TTP** (Tactics, Techniques, Procedures) | Tacticas, Tecnicas y Procedimientos | La forma en que un atacante opera. Las tacticas son el "que", las tecnicas el "como", y los procedimientos los pasos concretos. Framework MITRE ATT&CK los cataloga. |
| **MITRE ATT&CK** | Framework MITRE ATT&CK | Base de datos publica que clasifica todas las tecnicas conocidas de ataque. CrowdStrike mapea sus detecciones a este framework. |
| **Threat Intelligence** | Inteligencia de amenazas | Informacion recopilada sobre atacantes: quienes son, que buscan, como operan. CrowdStrike tiene un equipo dedicado a esto. |
| **Threat Actor** | Actor de amenaza | Grupo o individuo que realiza ciberataques. CrowdStrike les pone nombres de animales (ej: FANCY BEAR = grupo ruso). |
| **False Positive** | Falso positivo | Alerta que dice que algo es malicioso cuando en realidad es legitimo. Hay que minimizarlos para no perder tiempo. |
| **True Positive** | Verdadero positivo | Alerta correcta: realmente habia algo malicioso. |

### Herramientas y Tecnologias de Seguridad

| Termino (EN) | Termino (ES) | Explicacion |
|---|---|---|
| **EDR** (Endpoint Detection and Response) | Deteccion y respuesta en endpoints | Software que monitoriza lo que pasa en cada equipo (PC, servidor), detecta amenazas y permite responder. **CrowdStrike Falcon ES un EDR (y mas).** |
| **XDR** (Extended Detection and Response) | Deteccion y respuesta extendida | Como EDR pero ampliado: no solo mira endpoints sino tambien red, cloud, email, identidad... todo junto. |
| **SIEM** (Security Information and Event Management) | Gestion de eventos de seguridad | Herramienta que recopila logs de muchas fuentes y los correlaciona para detectar amenazas. Ejemplos: Splunk, QRadar. |
| **SOAR** (Security Orchestration, Automation and Response) | Orquestacion y automatizacion de seguridad | Herramienta que automatiza respuestas ante incidentes. Ejemplo: si detecta malware, automaticamente aisla el equipo. **CrowdStrike tiene Falcon Fusion SOAR.** |
| **Firewall** | Cortafuegos | Filtra el trafico de red, permite o bloquea conexiones segun reglas. |
| **Antivirus (AV)** | Antivirus | Software clasico que detecta malware comparando con una base de datos de firmas conocidas. Es mas limitado que un EDR. |
| **NGAV** (Next-Gen Antivirus) | Antivirus de nueva generacion | Antivirus moderno que usa machine learning y analisis de comportamiento, no solo firmas. **CrowdStrike incluye NGAV.** |
| **Sandbox** | Caja de arena | Entorno aislado donde se ejecuta un archivo sospechoso para ver que hace sin riesgo. |
| **DLP** (Data Loss Prevention) | Prevencion de perdida de datos | Herramientas que evitan que datos sensibles salgan de la organizacion. |

### Conceptos Generales

| Termino (EN) | Termino (ES) | Explicacion |
|---|---|---|
| **Endpoint** | Punto final / Equipo | Cualquier dispositivo que se conecta a la red: PC, portatil, servidor, movil. Es lo que CrowdStrike protege. |
| **Cloud-native** | Nativo en la nube | Disenado para funcionar en la nube desde el principio (no adaptado despues). CrowdStrike Falcon es cloud-native. |
| **On-premises (on-prem)** | En local / En las instalaciones | Software que se instala en tus propios servidores, no en la nube. |
| **Vulnerability** | Vulnerabilidad | Debilidad en un sistema que un atacante podria aprovechar. |
| **Patch** | Parche | Actualizacion que corrige una vulnerabilidad o bug. |
| **Compliance** | Cumplimiento normativo | Cumplir con regulaciones de seguridad (GDPR, PCI-DSS, etc.). |
| **Remediation** | Remediacion | Las acciones que tomas para solucionar un problema de seguridad. |
| **Quarantine** | Cuarentena | Aislar un archivo sospechoso para que no pueda ejecutarse ni hacer dano. |

---

## 2. Terminologia Especifica de CrowdStrike Falcon

### La Plataforma

| Termino | Explicacion |
|---|---|
| **CrowdStrike Falcon** | La plataforma completa de ciberseguridad de CrowdStrike. Es cloud-native, todo se gestiona desde la nube. |
| **Falcon Console** | La interfaz web donde gestionas todo: ves alertas, configuras politicas, gestionas equipos, etc. Es tu panel de control. |
| **Falcon Sensor** | El agente ligero que se instala en cada endpoint (PC, servidor). Recopila datos y los envia a la nube de CrowdStrike. No necesita actualizaciones de firmas. |
| **CID** (Customer ID) | Tu identificador unico como cliente de CrowdStrike. Lo necesitas para instalar sensores. |
| **Falcon Cloud** | La infraestructura en la nube de CrowdStrike donde se procesan todos los datos y se ejecuta la IA de deteccion. |
| **Threat Graph** | La base de datos masiva de CrowdStrike que correlaciona eventos de todos sus clientes en tiempo real. Procesa billones de eventos por semana. |

### Modulos de Falcon

| Termino | Explicacion |
|---|---|
| **Falcon Prevent** | Modulo de NGAV (antivirus de nueva generacion). Bloquea malware y ataques conocidos y desconocidos. |
| **Falcon Insight** | Modulo de EDR. Visibilidad completa de lo que pasa en cada endpoint, permite investigar y responder a incidentes. |
| **Falcon OverWatch** | Equipo humano de CrowdStrike que hace threat hunting 24/7. Buscan amenazas activamente que las maquinas podrian no detectar. |
| **Falcon Discover** | Modulo de higiene de TI. Te muestra que aplicaciones, cuentas y activos tienes en tu red. |
| **Falcon Spotlight** | Gestion de vulnerabilidades sin necesidad de escaneos. Usa los datos del sensor para identificar vulnerabilidades. |
| **Falcon Fusion** | Motor de automatizacion (SOAR). Permite crear flujos de trabajo automaticos para responder a incidentes. |
| **Falcon Identity Protection** | Proteccion de identidades y credenciales. Detecta ataques a Active Directory, movimiento lateral con credenciales robadas, etc. |
| **Falcon for Mobile** | Proteccion para dispositivos moviles (iOS y Android). |
| **Falcon Firewall Management** | Gestion del firewall del host (Windows Firewall) desde la consola de Falcon. |
| **Falcon Device Control** | Control de dispositivos USB y perifericos. |

### Gestion y Configuracion

| Termino | Explicacion |
|---|---|
| **Host / Endpoint** | Un equipo donde esta instalado el sensor de CrowdStrike. Cada host aparece en la consola. |
| **Host Group** | Agrupacion de equipos. Sirve para aplicar diferentes politicas a diferentes grupos (ej: servidores vs portatiles). Pueden ser estaticos (manuales) o dinamicos (por reglas). |
| **Prevention Policy** | Politica que define que amenazas bloquea automaticamente Falcon y como responde. Puedes tener diferentes politicas para diferentes grupos. |
| **Detection Policy** | Politica que define que comportamientos debe detectar y alertar (sin necesariamente bloquear). |
| **Response Policy** | Politica que define que acciones de respuesta estan disponibles (ej: si se puede aislar un equipo remotamente). |
| **Sensor Update Policy** | Politica que controla como y cuando se actualizan los sensores en los endpoints. |
| **Exclusion** | Regla para que Falcon ignore ciertos archivos, carpetas o procesos. Se usa cuando hay falsos positivos con software legitimo. |
| **Containment / Network Containment** | Aislar un equipo de la red para que no pueda comunicarse con nada excepto con la nube de CrowdStrike. Se usa cuando un equipo esta comprometido. |
| **Real Time Response (RTR)** | Acceso remoto al equipo desde la consola de Falcon. Permite ejecutar comandos, recopilar archivos, matar procesos, etc. Como un SSH/RDP pero a traves de CrowdStrike. |

### Alertas y Detecciones

| Termino | Explicacion |
|---|---|
| **Detection** | Alerta que Falcon genera cuando detecta actividad sospechosa o maliciosa en un endpoint. |
| **Severity** | Nivel de gravedad de una deteccion: Informational, Low, Medium, High, Critical. |
| **Tactic / Technique** | Referencia al framework MITRE ATT&CK. Te dice QUE tipo de ataque se detecto. |
| **Process Tree** | Vista que muestra la cadena de procesos: que proceso lanzo que otro. Muy util para investigar un incidente. |
| **Assigned to** | A quien se le asigno investigar esa deteccion. |
| **Status** | Estado de la deteccion: New (nueva), In Progress (en investigacion), True Positive, False Positive, Closed (cerrada). |

---

## 3. Terminos de Red y Sistemas

| Termino (EN) | Termino (ES) | Explicacion |
|---|---|---|
| **IP Address** | Direccion IP | Numero que identifica a un dispositivo en la red (ej: 192.168.1.100). |
| **DNS** (Domain Name System) | Sistema de nombres de dominio | Traduce nombres (google.com) a direcciones IP. Los atacantes a menudo usan DNS para comunicarse con sus servidores. |
| **Port** | Puerto | Numero que identifica un servicio en un equipo. Ej: 80 = web, 443 = web segura, 22 = SSH, 3389 = RDP. |
| **Protocol** | Protocolo | Lenguaje/reglas de comunicacion. Ej: TCP, UDP, HTTP, HTTPS, SMB. |
| **Active Directory (AD)** | Directorio Activo | Sistema de Microsoft que gestiona usuarios, equipos y permisos en una red empresarial. Objetivo frecuente de atacantes. |
| **Domain Controller (DC)** | Controlador de dominio | Servidor que gestiona el Active Directory. Si un atacante lo compromete, tiene control total. |
| **Hash** | Hash | Huella digital unica de un archivo. Si cambias un solo byte del archivo, el hash cambia completamente. Se usa para identificar malware. Tipos comunes: MD5, SHA-256. |
| **C2 / C&C** (Command and Control) | Comando y control | Servidor del atacante que envia instrucciones al malware instalado en tus equipos. |
| **Proxy** | Proxy | Intermediario entre tu equipo e internet. Puede usarse para filtrar trafico o para anonimato. |
| **VPN** | Red privada virtual | Tunel cifrado para conectarse a la red de la empresa desde fuera. |
| **API** (Application Programming Interface) | Interfaz de programacion | Forma de que dos programas se comuniquen entre si. CrowdStrike tiene APIs para integrarse con otras herramientas. |
| **PowerShell** | PowerShell | Lenguaje de scripting de Windows. Muy potente y por eso muy usado tanto por administradores como por atacantes. |
| **Registry** | Registro de Windows | Base de datos de configuracion de Windows. El malware a menudo modifica el registro para persistir. |
| **Service** | Servicio | Programa que se ejecuta en segundo plano. Muchos ataques crean servicios maliciosos para persistir. |

---

## 4. Nombres de Threat Actors de CrowdStrike

CrowdStrike nombra a los grupos de atacantes con nombres de animales segun su pais de origen:

| Animal | Pais / Origen |
|---|---|
| **BEAR** (Oso) | Rusia |
| **PANDA** | China |
| **KITTEN** (Gatito) | Iran |
| **CHOLLIMA** | Corea del Norte |
| **SPIDER** (Arana) | Cibercrimen (motivacion economica) |
| **JACKAL** (Chacal) | Hacktivismo |
| **HAWK** (Halcon) | Otros |

Ejemplos famosos: FANCY BEAR (Rusia, espionaje), WIZARD SPIDER (cibercrimen, ransomware Ryuk/Conti).

---

> **Nota**: Este glosario se ira ampliando conforme avancemos con los modulos del curso. Si encuentras un termino que no esta aqui, preguntame y lo anadimos.
