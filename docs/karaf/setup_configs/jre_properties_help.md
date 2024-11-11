#### jre.properties config file fixes


In karaf file /etc/jre.properties had java.nio.file added as it was shown in karaf webconsole
that its ```java.nio.file.spi -- Cannot be resolved and overwritten by Boot Delegation```
- Basically below configuration was missing and this made the karaf install the package as "default"

(in /etc/jre.properties)
```
jre-base= \
.
.
 java.nio.file, \
.
.
```