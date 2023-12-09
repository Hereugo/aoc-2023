package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func GCD(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

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
	lines, err := readLines("./input.txt")
	if err != nil {
		panic(err)
	}

	instructions := lines[0]

	graph := make(map[string][2]string)
	for i, value := range lines {
		if i < 2 {
			continue
		}

		// AAA = (BBB, CCC)
		r := regexp.MustCompile(`(?P<A>[A-Z]{3}) = \((?P<B>[A-Z]{3}), (?P<C>[A-Z]{3})\)`)
		matches := r.FindStringSubmatch(value)

		u := matches[r.SubexpIndex("A")]
		v1 := matches[r.SubexpIndex("B")]
		v2 := matches[r.SubexpIndex("C")]

		graph[u] = [2]string{v1, v2}
	}

	ans := 1
	for k := range graph {
		if k[2] == 'A' {
			i := 0
			cnt := 0
			u := k
			for u[2] != 'Z' {
				switch instructions[i] {
				case 'L':
					u = graph[u][0]
				case 'R':
					u = graph[u][1]
				}
				i += 1
				i %= len(instructions)
				cnt += 1
			}

			ans = ans * cnt / GCD(ans, cnt)
		}
	}

	fmt.Println(ans)

}
