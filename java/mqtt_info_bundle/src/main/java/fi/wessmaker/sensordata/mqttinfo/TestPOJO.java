package fi.wessmaker.sensordata.mqttinfo;

import java.util.ArrayList;

import org.eclipse.paho.client.mqttv3.MqttClient;

import fi.wessmaker.sensordata.handler.CustomTopic;
import fi.wessmaker.sensordata.handler.MQTTHandler;

public class TestPOJO {
   public int thisTHIsd;
   public String brokerIp;
   public MqttClient mqttClient;
   public boolean connection;
   public ArrayList<CustomTopic> customTopics;
   public boolean autoReconnect;
   /*
    * private
    * 
    * private static TestPOJO get(){
    * return TestPOJO.TestPOJO;
    * }
    */

   public TestPOJO() {
      this.brokerIp = "http://localhost:1883";
      this.mqttClient = null;
      this.customTopics = new ArrayList<>();
      this.customTopics.add(new CustomTopic("aaaa", "aaaa"));
      this.customTopics.add(new CustomTopic("bbb", "bbb"));
      this.customTopics.add(new CustomTopic("ccc", "cccc"));
      this.customTopics.add(new CustomTopic("dddd", "dddd"));
      this.customTopics.add(new CustomTopic("ffff", "ffff"));
      this.autoReconnect = false;
      this.connection = MQTTHandler.hasConnection();
      System.out.println(this.connection);
      this.thisTHIsd = 12;
   }
}
