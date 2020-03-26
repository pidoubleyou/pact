package pact.springpactprovider.person;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class PersonControllerTest {

  @MockBean
  private PersonRepository personRepository;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void createPerson() throws Exception {

    this.mockMvc
      .perform(post("/persons")
               .contentType(MediaType.APPLICATION_JSON_VALUE)
               .content("{\"name\":\"test\"}"))
      .andExpect(status().isOk());
  }
  
  @Test
  public void getById() throws Exception {
    when(this.personRepository.getById(3L)).thenReturn(Optional.of(new Person(3, "test")));

    this.mockMvc
        .perform(get("/persons/3"))
        .andExpect(status().isOk())
        .andExpect(content().json("{\"id\":3,\"name\":\"test\"}"));
  }
}
