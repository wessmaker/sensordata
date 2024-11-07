#### Features needed in karaf:
"the Karaf http feature is automatically installed by CXF."
- cxf-jarxrs

```powershell
feature:repo-add cxf
feature:install cxf blueprint-web
```


#### Blueprint to karaf:

"In Karaf, you need to configure CXF to expose your JAX-RS service. You can do this by creating a Blueprint XML configuration file in your bundle under OSGI-INF/blueprint/blueprint.xml."

exmpl:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:cxf="http://cxf.apache.org/blueprint/jaxrs"
           xsi:schemaLocation="
               http://www.osgi.org/xmlns/blueprint/v1.0.0 
               http://www.osgi.org/xmlns/blueprint/v1.0.0/blueprint.xsd
               http://cxf.apache.org/blueprint/jaxrs 
               http://cxf.apache.org/schemas/blueprint/jaxrs.xsd">

    <!-- Register MyServiceImpl as a JAX-RS endpoint -->
    <cxf:rsServer id="myService" address="/api">
        <cxf:serviceBeans>
            <ref component-id="myServiceImpl"/>
        </cxf:serviceBeans>
    </cxf:rsServer>

    <!-- Declare MyServiceImpl as a bean -->
    <bean id="myServiceImpl" class="com.example.MyServiceImpl"/>

</blueprint>
```