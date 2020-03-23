import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost:8080' }
      ]
    });
    service = TestBed.inject(PersonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getById', () => {
    const testPerson = { id: 3, name: 'test person' };

    it('should return person data', () => {
      service.getById(3).subscribe(data => {
        expect(data).toEqual(testPerson);
      });

      const request = httpTestingController.expectOne('http://localhost:8080/persons/3');
      request.flush(testPerson);
    });

    it('should return undefined if person not exists', () => {
      service.getById(398).subscribe(data => {
        expect(data).toEqual(undefined);
      });

      const request = httpTestingController.expectOne('http://localhost:8080/persons/398');
      request.flush('', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('create', () =>{
    it('should return created person', () => {
      const newPerson = { id: 3, name: 'New Test'};
      service.create('New Test').subscribe(data => {
        expect(data).toEqual(newPerson);
      });

      const request = httpTestingController.expectOne('http://localhost:8080/persons');
      request.flush(newPerson);
    })
  })
});
