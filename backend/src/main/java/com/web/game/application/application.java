package com.web.game.application;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component
public class application {
    private repository Repository;

    public List<Integer> getRank()
    {
        return Repository.getRankList();
    }

    public void updateRank(int score)
    {
        Repository.updateRank(score);
    }
}
