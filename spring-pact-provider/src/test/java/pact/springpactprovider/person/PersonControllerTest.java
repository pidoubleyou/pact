package pact.springpactprovider.person;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class PersonControllerTest {

  @MockBean
  private PersonRepository personRepository;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void createPerson() throws Exception {

    this.mockMvc.perform(post("/persons").contentType(MediaType.APPLICATION_JSON_VALUE).content("{\"name\":\"test\"}")).andExpect(status().isOk());
  }
}