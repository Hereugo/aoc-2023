import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;

public class Main {
    public static Long converter(Long x, ArrayList<Tuple<Long, Long, Long>> arr) {
        for (Tuple<Long, Long, Long> tuple : arr) {
            long destStart = tuple.getFirst();
            long sourStart = tuple.getSecond();
            long rangLength = tuple.getThird();
            
            if (x >= sourStart && x < sourStart + rangLength) {
                x = destStart + (x - sourStart);
                break;
            }
        }

        return x;
    }

    public static void main(String[] args) {
        ArrayList<Tuple<Long, Long, Long>> sts = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> stf = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> ftw = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> wtl = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> ltt = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> tth = new ArrayList<>();
        ArrayList<Tuple<Long, Long, Long>> htl = new ArrayList<>();

        ArrayList<String> content = new ArrayList<>();
        try {
            File file = new File("./day-05/src/input.txt");
            Scanner sc = new Scanner(file);

            while (sc.hasNextLine()) {
                content.add(sc.nextLine());
            }
            
            sc.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred, while reading the file.");
            e.printStackTrace();
            return;
        }

        ArrayList<Long> seeds = new ArrayList<>();
        
        ArrayList<Tuple<Long, Long, Long>> cur = null;

        for (String line : content) {
            switch(line) {
                case "seed-to-soil map:": {
                    cur = sts;
                    break;
                }
                case "soil-to-fertilizer map:": {
                    cur = stf;
                    break;
                }
                case "fertilizer-to-water map:": {
                    cur = ftw;
                    break;
                }
                case "water-to-light map:": {
                    cur = wtl;
                    break;
                }
                case "light-to-temperature map:": {
                    cur = ltt;
                    break;
                }
                case "temperature-to-humidity map:": {
                    cur = tth;
                    break;
                }
                case "humidity-to-location map:": {
                    cur = htl;
                    break;
                }
                case "\n": {
                    break;
                }
                default: {
                    Pattern pattern = Pattern.compile("\\d+");
                    Matcher matcher = pattern.matcher(line);
    
                    if (line.contains("seeds: ")) {
                        while (matcher.find()) {
                            Long x = Long.parseLong(matcher.group());
                            seeds.add(x);
                        }
                    } else {
                        while (matcher.find()) {    
                            long destStart = Long.parseLong(matcher.group());
                            matcher.find();
                            long sourStart = Long.parseLong(matcher.group());
                            matcher.find();
                            long rangLength = Long.parseLong(matcher.group());

                            // System.out.printf("%d, %d, %d\n", destStart, sourStart, rangLength);

                            cur.add(Tuple.of(destStart, sourStart, rangLength));

                            // for (int dx = 0; dx < rangLength; dx++) {
                            //     currentMap.put(sourStart + dx, destStart + dx);
                            //     // System.out.println(currentMap);
                            // }
                        }
                    }
                }
            }
        }

        Long ans = Long.MAX_VALUE;

        for (int i = 0; i < seeds.size(); i += 2) {
            Long st = seeds.get(i);
            Long ln = seeds.get(i + 1);
            
            // System.out.println(st + " " + (st + ln - 1));

            for (Long j = st; j < st + ln; j++) {
                // System.out.println();
                // System.out.println("Seed: " + j);
                Long x = converter(j, sts);
                // System.out.println("Soil: " + x);
                x = converter(x, stf);
                // System.out.println("Fert: " + x);
                x = converter(x, ftw);
                // System.out.println("Wate: " + x);
                x = converter(x, wtl);
                // System.out.println("ligh: " + x);
                x = converter(x, ltt);
                // System.out.println("temp: " + x);
                x = converter(x, tth);
                // System.out.println("humi: " + x);
                x = converter(x, htl);
                // System.out.println("loca: " + x);

                ans = Math.min(ans, x);
            }
        }

        // PART ONE
        // for (Long x : seeds) {
        //     x = converter(x, sts);
        //     x = converter(x, stf);
        //     x = converter(x, ftw);
        //     x = converter(x, wtl);
        //     x = converter(x, ltt);
        //     x = converter(x, tth);
        //     x = converter(x, htl);

        //     ans = Math.min(ans, x);
        // }

        System.out.println(ans);
    }
}