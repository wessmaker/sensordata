#### Setting up karaf to expose REST endpoint

```powershell
feature:repo-add cxf;
feature:install -s cxf-jaxrs;
feature:install -s http;
feature:install -s webconsole;
```

- Open config file "KARAF_HOME/etc/user.properties", uncomment or add following lines
   ```properties
   karaf = karaf,_g_:admingroup
   _g_\:admingroup = group,admin,manager,viewer,systembundles,ssh
   ```
mvn:org.glassfish.jersey.core/jersey-common/2.30.1
mvn:org.glassfish.jersey.core/jersey-client/2.30.1

- Add missing packages **"java.nio."** to **KARAF_HOME/etc/jre.properties** jre-base
   ```properties
   jre-base= \
    .
    .
    java.nio.file, \
    java.nio.file.spi, \
    .
    .
   ```


### Additional tips:
- Webconsole: http://localhost:8181/system/console

- Add java.nio.file to KARAF_HOME/etc/jre.properties
   ```properties
   jre-base= \
    java.applet, \
    java.awt, \
    .
    .
    java.nio.file, \
    java.nio.file.spi, \
    .
    .
   ```


-  
   ```java
   javax.ws.rs.ext.RuntimeDelegate.setInstance(new org.apache.cxf.jaxrs.impl.RuntimeDelegateImpl());
   // This explicitly sets the RunTimeDelegate
   ```