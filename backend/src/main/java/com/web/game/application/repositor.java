package com.web.game.application;
import com.web.game.entity.rank;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface repositor extends MongoRepository<rank, String> {
    rank findRankByList(List<Integer> list);
    rank findRankById(String id);
}
