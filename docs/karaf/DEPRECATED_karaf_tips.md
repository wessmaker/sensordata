## THIS DOCUMENTATION IS DEPRECATED



### Generate karaf feature using archetype
```powershell
mvn archetype:generate `
"-DarchetypeGroupId=org.apache.karaf.archetypes" `
"-DarchetypeArtifactId=karaf-feature-archetype" `
"-DarchetypeVersion=4.4.6" `
"-DgroupId=fi.company" `
"-DartifactId=nameofproject" `
"-Dversion=1.0-SNAPSHOT" `
"-Dpackage=package (fi.wessmaker)"
```

</br>


### This was printed when created using vs code maven -> new project with archetype of karaf feature
```
  Executing task: "mvn org.apache.maven.plugins:maven-archetype-plugin:3.1.2:generate -DarchetypeArtifactId="karaf-feature-archetype" -DarchetypeGroupId="org.apache.karaf.archetypes" -DarchetypeVersion="4.4.6" -DgroupId="fi.wessmaker" -DartifactId="testinkaraffeaturearchtype"" 
```


</br>


### Check all headers (dependencies)
```powershell
headers [bundleID]
```
- It will show all missing packages


</br>


### Get cxf repo and feature
(used for cxf REST api implemntation)
```powershell
feature:repo-add cxf;
feature:install -s cxf-jaxrs;
```


</br>


### Install bundles in this order with start (-s) and start-level (-l 80) flags 
```powershell
bundle:install -s -l 80 mvn:org.apache.cxf/cxf-rt-rs-client/3.6.4;
bundle:install -s -l 80 mvn:jakarta.annotation/jakarta.annotation-api/1.3.5;
bundle:install -s -l 80 mvn:com.fasterxml.jackson.jaxrs/jackson-jaxrs-json-provider/2.14.1;
bundle:install -s -l 80 mvn:com.fasterxml.jackson.core/jackson-core/2.14.1;
bundle:install -s -l 80 mvn:com.fasterxml.jackson.core/jackson-annotations/2.14.1;
bundle:install -s -l 80 mvn:com.fasterxml.jackson.core/jackson-databind/2.14.1;
```


</br>


### Bundles may need
- pache ServiceMix :: Specs :: JAX-RS API 2.1 


</br>


### To set start-level manually for bundle
```powershell
start-level [ID] 80 
```




</br>


### After installing bundles
```powershell
karaf@root()> bundle:list

START LEVEL 100 , List Threshold: 50
 ID │ State  │ Lvl │ Version │ Name
────┼────────┼─────┼─────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 23 │ Active │  80 │ 2.14.1  │ Jackson-annotations
 24 │ Active │  80 │ 2.14.1  │ Jackson-core
 25 │ Active │  80 │ 2.14.1  │ jackson-databind
 28 │ Active │  80 │ 2.14.1  │ Jackson-JAXRS: JSON
 39 │ Active │  80 │ 4.4.6   │ Apache Karaf :: OSGi Services :: Event
 74 │ Active │  80 │ 3.6.4   │ Apache CXF JAX-RS Client
114 │ Active │  80 │ 1.3.5   │ Jakarta Annotations API

karaf@root()>
```


https://stackoverflow.com/questions/70368831/karaf-assembly-and-features-new-and-old-method






</br>


### Exposing REST API in Karaf

```xml
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-rt-transports-http</artifactId>
    <version>${cxf.version}</version>
</dependency>
```





</br>


### Karaf bundle webconsole installation
```powershell
feature:install webconsole;
```
Then go to http://localhost:8181/system/console





</br>


### Fixing "java.lang.ClassNotFoundException: org.glassfish.jersey.internal.RuntimeDelegateImpl not found by org.eclipse.jetty.util"

```java
javax.ws.rs.ext.RuntimeDelegate.setInstance(new org.apache.cxf.jaxrs.impl.RuntimeDelegateImpl());
// This explicitly sets the RunTimeDelegate
```





</br>


### jre.properties config file fixes


In karaf file /etc/jre.properties had java.nio.file added as it was shown in karaf webconsole
that its ```java.nio.file.spi -- Cannot be resolved and overwritten by Boot Delegation```
- Basically below configuration was missing and this made the karaf install the package as "default"

(in /etc/jre.properties)
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