require("io")
require("math")

local quad_solver = function(a, b, c, d)
    local D = b * b - 4 * a * c
    local res = (-b + d * math.sqrt(D)) / (2 * a)

    if d == 1 then
        if res - math.ceil(res) == 0 then
            return res + 1
        end

        return math.ceil(res)
    end

    if res - math.floor(res) == 0 then
        return res - 1
    end

    return math.floor(res)
end

file = io.open("input-part-2.txt", "r")
if file == nil then
    print("No input file found")
    return
end

local t = {}
local d = {}
for line in file:lines() do
    if line:match("^Time:") then
        for x in line:gmatch("%d+") do
            table.insert(t, tonumber(x))
        end
    end
    if line:match("^Distance:") then
        for x in line:gmatch("%d+") do
            table.insert(d, tonumber(x))
        end
    end
end

local ans = 1
for i = 1, #t do
    local x1 = quad_solver(-1, t[i], -d[i], 1)
    local x2 = quad_solver(-1, t[i], -d[i], -1)

    print("x1 = " .. x1 .. ", x2 = " .. x2)

    ans = ans * (math.abs(x1 - x2) + 1)
end

print("Answer: " .. ans)

file:close()

