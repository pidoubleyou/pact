package pact.springpactprovider.person;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class PersonRepository {
  public Person save(Person person) {
    person.setId(87L);

    return person;
  }

  public Optional<Person> getById(long id) {
    if (id == 3L) {
      return Optional.of(new Person(id, "test person"));
    }

    return Optional.empty();
  }
}
