package fi.wessmaker.sensordata.handler;

import java.util.ArrayList;

import org.eclipse.paho.client.mqttv3.MqttClient;

public class OuterPOJO {
   private int thisTHIsd;
   private String brokerIp;
   private MqttClient mqttClient;
   private boolean connection;
   private ArrayList<CustomTopic> customTopics;
   private boolean autoReconnect;
   private OuterPOJO outerPOJO;

   public OuterPOJO() {
      this.brokerIp = "http://localhost:1883";
      this.mqttClient = null;
      this.customTopics = new ArrayList<>();
      this.autoReconnect = false;
      this.connection = true;
      this.thisTHIsd = 12;
   }

}
