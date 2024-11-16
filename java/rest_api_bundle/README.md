
Fixing common errors in REST implementation
===

<br>

> **java.lang.ClassNotFoundException: org.glassfish.jersey.internal.RuntimeDelegateImpl not found by org.eclipse.jetty.util**
-  Fixed by explicitly setting the RunTimeDelegate in start method of bundleactivator
   ```java
   javax.ws.rs.ext.RuntimeDelegate.setInstance(new org.apache.cxf.jaxrs.impl.RuntimeDelegateImpl());
   ```
<br>

> **MessageBodyWriter or MessageBodyReader not found**
- Fixed by setting the provider in start method of bundleactivator
   ```java
   customBean.setProvider(new JacksonJsonProvider());
   ```
