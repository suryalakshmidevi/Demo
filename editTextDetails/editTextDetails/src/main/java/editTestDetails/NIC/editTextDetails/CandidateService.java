package editTestDetails.NIC.editTextDetails;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidateService {
    
    @Autowired
    public CandidateRepo repo;

    public List<CandidateDetails> getAllCadidates(){
        return repo.findAll();
    }

    public Optional<CandidateDetails> getCandidateById(int id) {
        return repo.findById(id);
    }
    public CandidateDetails saveCandidate(CandidateDetails candidate){
        return repo.save(candidate);
    }
    
    public void deleteCandidate(int id){
        repo.deleteById(id);
    }

    


}
