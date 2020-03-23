package pact.springpactprovider.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class PersonController {

  private PersonRepository personRepository;

  @Autowired
  public PersonController(PersonRepository personRepository) {
    this.personRepository = personRepository;
  }

  @PostMapping(value = "/persons", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Person> createPerson(@RequestBody Person person) {
    Person result = this.personRepository.save(person);
    return ResponseEntity.ok(result);
  }

  @GetMapping(value = "/persons/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Person> getById(@PathVariable long id) {
    Optional<Person> result = this.personRepository.getById(id);

    if (result.isPresent()) {
      return ResponseEntity.ok(result.get());
    }
    return ResponseEntity.notFound().build();
  }
}
