## Setting up karaf for REST api 

 First install [apache karaf](https://karaf.apache.org/download.html)

<br>

 >In this documentation **KARAF_HOME** refers the root folder of **karaf** (containing bin, lib, etc, etc.)

<br>

- **(OPTIONAL but necessary for webconsole & ssh)** Open file "user.properties" in "KARAF_HOME/etc/" and uncomment or add following lines at the bottom 
   ```properties
   karaf = karaf,_g_:admingroup
   _g_\:admingroup = group,admin,manager,viewer,systembundles,ssh
   ```
<br>


- Add missing packages **"jav.nio.file"** & **"jav.nio.file.spi"** to file **"jre.properties"** in diretory **"KARAF_HOME/etc/"** under **"jre-base"**
   ```properties
   jre-base= \
    .
    .
    java.nio.file, \
    java.nio.file.spi, \
    .
    .
   ```
<br>

- Run **karaf.bat** in terminal in **KARAF_HOME/bin** to start karaf in terminal

<br>

- Run following commands in **karaf shell** (webconsole is optional). Directly **copy-pasting whole block works** as there are **semicolons** at the end of lines
   ```powershell
   feature:repo-add cxf;
   feature:install -s cxf;
   feature:install -s cxf-jaxrs;
   feature:install -s http;
   feature:install -s webconsole;   
   ```

<br>

- Open directory containing bundle's pom.xml in **terminal** and run `mvn clean install`

<br>

- Install the bundle with maven in karaf shell
  ```powershell
  bundle:install -s mvn:<group.id>/<artifactid>/<version>
  ```
***

<br>
<br>


### Avoiding errors 

