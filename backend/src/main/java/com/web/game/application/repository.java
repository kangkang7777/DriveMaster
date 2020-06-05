package com.web.game.application;

import com.web.game.entity.rank;

import java.util.List;

public interface repository {
    rank getRankByList(List<Integer> list);
    rank getRankById(String id);
    rank getRank();
    List<Integer> getRankList();
    void updateRank(int score);
}
