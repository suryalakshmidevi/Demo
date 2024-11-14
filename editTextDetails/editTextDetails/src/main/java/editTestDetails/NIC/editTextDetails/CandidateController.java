package editTestDetails.NIC.editTextDetails;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

    @Autowired
    private CandidateService service;

    @GetMapping
    public List<CandidateDetails> getAllCandidates() {
        return service.getAllCadidates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidateDetails> getCandidateById(@PathVariable int id) {
        return service.getCandidateById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CandidateDetails createCandidate(@RequestBody CandidateDetails candidate) {
        return service.saveCandidate(candidate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidateDetails> updateCandidate(@PathVariable int id, @RequestBody CandidateDetails candidateDetails) {
        return service.getCandidateById(id).map(candidate -> {
            candidate.setName(candidateDetails.getName());
            candidate.setEmail(candidateDetails.getEmail());
            candidate.setAadhar(candidateDetails.getAadhar());
            candidate.setQualification(candidateDetails.getQualification());
            candidate.setAddress(candidateDetails.getAddress());
            candidate.setDetails(candidateDetails.getDetails());
            return ResponseEntity.ok(service.saveCandidate(candidate));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable int id) {
        service.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }
}


