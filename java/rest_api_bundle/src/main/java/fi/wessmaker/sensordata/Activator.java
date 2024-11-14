/*
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements. See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License. You may obtain a
 * copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package fi.wessmaker.sensordata;

import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.apache.cxf.jaxrs.lifecycle.SingletonResourceProvider;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import fi.wessmaker.sensordata.mqttconfig.MQTTConfigApi;

public class Activator implements BundleActivator {
    Server server;
    JAXRSServerFactoryBean bean = new JAXRSServerFactoryBean();
    
    public void start (BundleContext context) {
        System.out.println("STARTING REST API BUNDLE");
        javax.ws.rs.ext.RuntimeDelegate
                .setInstance(new org.apache.cxf.jaxrs.impl.RuntimeDelegateImpl());
        bean.setResourceClasses(MQTTConfigApi.class);
        bean.setAddress("http://localhost:8080/");
        bean.setProvider(new JacksonJsonProvider());
        server = bean.create();
        
    }
    
    public void stop (BundleContext context) {
        System.out.println("Stopping the bundle");
        if (server != null) {
            server.destroy();
        }
    }
}
