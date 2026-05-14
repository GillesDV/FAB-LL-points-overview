# what is this?

Flesh and Blood (FAB) is a Trading Card Game that tracks Living Legend (LL) points for each hero in the game.

Heroes reach Living Legend status after earning 1 000 points. They earn points by winning larger events such as Skirmishes, Battle Hardeneds, and Callings. Once this happens they are no longer legal in their standard constructed format.

The amount of points earned depends on which event they win and how recently released they are. This web app is meant to quickly show how many events they would have to win before they would become LL.

## Points earned per event
| Event Type | Points per event |
|--|--|
| World Championship | 100 |
| Pro Tour | 100 |
| Calling | 50 |
| US National Championship | 50 |
| National Championship <br> (Cap 24-32 / 64-80 / 96-160) | 5 / 10 / 25 |
| Battlegrounds | 10 |
| Pro Quest+ / World Championship Qualifier | 5 |

## Point modifier
| Time since release | Multipler |
|--|--|
| Less than 1 year | * 0.5 |
| 1-2 years | * 1.0 |
| 2+ years | * 1.5 |

# How easily to update LL points
Living Legend points get updated once per week on Monday night (West EU time). Sadly there is no API available for this, official or fan-made. Thus a little script was made for this to auto-magically inject it into the app. 
- Go to https://fabtcg.com/living-legend/ 
- Scroll down to the `Living Legend Leaderboard – Classic Constructed` header
- copy the entire table and paste it into `tools/input.txt`
- run `python script.py`

## TODO / To Improve
- add avatars instead of dumb name abbreviations as icons
- Look into reducing total files. <br> The big sinner is `@flesh-and-blood/cards`. It's a handy npm package that automatically gives all the hero-related data, since it's open source and thus automagically gets updated (by others), but it's 9.1MB worth of data. Aka 96% of the total size. 