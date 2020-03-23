package pact.springpactprovider;

import au.com.dius.pact.provider.junit.Provider;
import au.com.dius.pact.provider.junit.State;
import au.com.dius.pact.provider.junit.loader.PactBroker;
import au.com.dius.pact.provider.junit.loader.PactFolder;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.spring.junit5.PactVerificationSpringProvider;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pact.springpactprovider.person.Person;
import pact.springpactprovider.person.PersonRepository;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Provider("spring-pact-provider")
//@PactBroker
@PactFolder("/home/snoopy/development/work/pact/angular-pact-consumer/pacts/")
public class PactTest {

  @MockBean
  private PersonRepository personRepository;

  @TestTemplate
  @ExtendWith(PactVerificationSpringProvider.class)
  void pactVerificationTestTemplate(PactVerificationContext context) {
    context.verifyInteraction();
  }

  @State("provider returns new person")
  public void postNewPersonState() {
    Person person = new Person(87L, "new person");
    when(personRepository.save(any(Person.class))).thenReturn(person);
  }

  @State("provider returns person")
  public void getByIdState() {
    Person person = new Person(3L, "test person");
    when(personRepository.getById(3L)).thenReturn(Optional.of(person));
  }
}