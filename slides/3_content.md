### Integrationstests

![image](resources/pact1.png)

<-->

### Bewertung

<span style="color:green">*</span> Integration sichergestellt 

<span style="color:red">*</span>  Abhängigkeiten

<span style="color:red">*</span> spätes Feedback

<span style="color:red">*</span> instabile Tests

<span style="color:red">*</span> hoher Wartungsaufwand

<--->

### Isolierte Tests

<img src="resources/pact2.png" width="50%" height="50%"></img>

<-->

### Bewertung 

<span style="color:red">*</span> Integration nicht sichergestellt 

<span style="color:green">*</span> Unabhängigkeiten

<span style="color:green">*</span> schnelles Feedback

<span style="color:green">*</span> stabile Tests

<span style="color:green">*</span> geringer Wartungsaufwand

<--->

### PACT

<img src="resources/pact3.png" width="50%" height="50%"></img>

<-->

### Bewertung 

<span style="color:green">*</span> Integration sichergestellt 

<span style="color:green">*</span> Unabhängigkeiten

<span style="color:green">*</span> schnelles Feedback

<span style="color:green">*</span> stabile Tests

<span style="color:green">*</span> geringer Wartungsaufwand

<--->
### PACT mit Broker

<img src="resources/pact4.png" width="50%" height="50%"></img>

<-->

### Zusätzliche Features 

* Visualisierung von
   * Testergebnis
   * Abhängigkeiten

* Versionierung

* CI-Integration

<--->

<p style="font-size: 200px; color: green">Beispiel</p>

<--->

### Wozu ist PACT geeignet

Test von APIs (REST/Kafka/JMS/...) hinsichtlich

* Consumer:
  * Korrektheit des Requests
  * Verarbeitung der Response

* Provider:
  * Verarbeitung des Requests
  * Korrektheit der Response

<-->
### Wozu ist PACT nicht geeignet

* Contract ohne Absprache definieren

* Funktionale Tests von Providerlogiken   
(z.B. Validierungen)

<--->

### CI-Integration

* Deployment des Providers verhindern
  
  * Testergebnis in Build prüfen

<-->

### CI-Integration
* Deployment des Consumers verhindern
  
  * Consumer-Build triggert über Webhook Verification-Build des Providers
  
  * Provider triggert über Webhook Consumer-Deployment-Build
