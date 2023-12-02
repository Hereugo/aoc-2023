package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func readLines(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines, scanner.Err()
}

func main() {
	// --- PART 1 ---
	// green_count := 13
	// red_count := 12
	// blue_count := 14

	games, err := readLines("./input.txt")
	if err != nil {
		panic(err)
	}

	ans := 0
	for _, game := range games {
		cubes := map[string]int{
			"green": 0,
			"red":   0,
			"blue":  0,
		}

		// fmt.Println("Game ", game_num+1, ":")
		for _, text := range strings.Split(game, ";") {
			r, err := regexp.Compile(`\d+ (green|red|blue)`)
			if err != nil {
				panic(err)
			}

			for _, cube_info := range r.FindAllString(text, -1) {
				info := strings.Split(cube_info, " ")

				num, err := strconv.Atoi(info[0])
				if err != nil {
					panic(err)
				}

				cubes[info[1]] = max(cubes[info[1]], num)
			}
		}

		ans += cubes["green"] * cubes["red"] * cubes["blue"]

		// --- PART 1 ---
		// if cubes["green"] <= green_count && cubes["red"] <= red_count && cubes["blue"] <= blue_count {
		// 	ans += game_num + 1
		// 	fmt.Println("TRUE: ", game_num+1)
		// }
	}

	fmt.Println(ans)
}
