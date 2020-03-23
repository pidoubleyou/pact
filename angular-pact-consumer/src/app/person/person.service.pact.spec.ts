import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import { HttpClientModule } from '@angular/common/http';

describe('PACT PersonService', () => {
  let provider;
  let personService: PersonService;

  beforeAll((done) => {
    provider = new PactWeb({ consumer: undefined, provider: undefined});

    // required for slower CI environment
    setTimeout(done, 2000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(done, done.fail);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost:1234' }
      ]
    });
    personService = TestBed.inject(PersonService);
  });

  describe('getById', () => {
    beforeAll((done) => {
      provider.addInteraction({
        state: `provider returns person`,
        uponReceiving: 'a request to get a person by id',
        withRequest: {
          method: 'GET',
          path: '/persons/3'
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike({
              id: 3,
              name: 'test person'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));

      provider.addInteraction({
        state: `provider returns not found`,
        uponReceiving: 'a request to get a person by an unknown id',
        withRequest: {
          method: 'GET',
          path: '/persons/6'
        },
        willRespondWith: {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));
    });

    it('should return person data', (done) => {
      const testPerson = { id: 3, name: 'test person' };

      personService.getById(3).subscribe(person => {
        expect(person).toEqual(testPerson);
        done();
      }, error => {
        done.fail(error);
      });
    });

    it('should return undefined if person does not exist', (done) => {
      personService.getById(6).subscribe(person => {
        expect(person).toBeUndefined();
        done();
      }, error => {
        done.fail(error);
      });
    });  });

  describe('create', () => {
    const personName = 'new person';

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider returns new person`,
        uponReceiving: 'a request to post a new person',
        withRequest: {
          method: 'POST',
          path: '/persons',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            name: personName
          }
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike({
              id: Matchers.term({
                generate: '3',
                matcher: '[0-9]+'
              }),
              name: personName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));
    });

    it('should create person', (done) => {
      personService.create(personName).subscribe(person => {
        expect(person).not.toBeUndefined();
        expect(person.id).toBeGreaterThan(0);
        expect(person.name).toEqual(personName);
        done();
      }, error => {
        done.fail(error);
      });
    });
  });
});
