import { HardhatUserConfig, task, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";

export const ethMainnetUrl = vars.get(
  "ETH_MAINNET_URL",
  "https://rpc.ankr.com/eth",
);
export const accounts = [
  vars.get(
    "CREATEX_DEPLOYER",
    // `keccak256("DEFAULT_VALUE")`
    "0x0d1706281056b7de64efd2088195fa8224c39103f578c9b84f951721df3fa71c",
  ),
];

task("solc", "Prints the configured Solidity version", async (_, hre) => {
  console.log(hre.config.solidity.compilers[0].version);
});

task("evm", "Prints the configured EVM version", async (_, hre) => {
  console.log(hre.config.solidity.compilers[0].settings.evmVersion);
});

const config: HardhatUserConfig = {
  paths: {
    sources: "./src",
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10_000_000,
      },
      evmVersion: "paris", // Prevent using the `PUSH0` opcode
      viaIR: false, // Disable compilation pipeline to go through the Yul intermediate representation
      metadata: {
        bytecodeHash: "none", // Remove the metadata hash from the bytecode
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "cancun",
      forking: {
        url: vars.get("ETH_MAINNET_URL", ethMainnetUrl),
        // The Hardhat network will by default fork from the latest mainnet block
        // To pin the block number, specify it below
        // You will need access to a node with archival data for this to work!
        // blockNumber: 14743877,
        // If you want to do some forking, set `enabled` to true
        enabled: false,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    tenderly: {
      url: `https://rpc.tenderly.co/fork/${vars.get("TENDERLY_FORK_ID", "")}`,
    },
    devnet: {
      url: `https://rpc.vnet.tenderly.co/devnet/${vars.get(
        "TENDERLY_DEVNET_ID",
        "",
      )}`,
      accounts,
    },
    goerli: {
      chainId: 5,
      url: vars.get(
        "ETH_GOERLI_TESTNET_URL",
        "https://rpc.ankr.com/eth_goerli",
      ),
      accounts,
    },
    sepolia: {
      chainId: 11155111,
      url: vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
      accounts,
    },
    holesky: {
      chainId: 17000,
      url: vars.get(
        "ETH_HOLESKY_TESTNET_URL",
        "https://holesky.rpc.thirdweb.com",
      ),
      accounts,
    },
    ethMain: {
      chainId: 1,
      url: ethMainnetUrl,
      accounts,
    },
    bscTestnet: {
      chainId: 97,
      url: vars.get(
        "BSC_TESTNET_URL",
        "https://data-seed-prebsc-1-s1.binance.org:8545",
      ),
      accounts,
    },
    bscMain: {
      chainId: 56,
      url: vars.get("BSC_MAINNET_URL", "https://bsc-dataseed1.binance.org"),
      accounts,
    },
    optimismTestnet: {
      chainId: 420,
      url: vars.get("OPTIMISM_TESTNET_URL", "https://goerli.optimism.io"),
      accounts,
    },
    optimismSepolia: {
      chainId: 11155420,
      url: vars.get("OPTIMISM_SEPOLIA_URL", "https://sepolia.optimism.io"),
      accounts,
    },
    optimismMain: {
      chainId: 10,
      url: vars.get("OPTIMISM_MAINNET_URL", "https://mainnet.optimism.io"),
      accounts,
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: vars.get(
        "ARBITRUM_SEPOLIA_URL",
        "https://sepolia-rollup.arbitrum.io/rpc",
      ),
      accounts,
    },
    arbitrumMain: {
      chainId: 42161,
      url: vars.get("ARBITRUM_MAINNET_URL", "https://arb1.arbitrum.io/rpc"),
      accounts,
    },
    arbitrumNova: {
      chainId: 42170,
      url: vars.get("ARBITRUM_NOVA_URL", "https://nova.arbitrum.io/rpc"),
      accounts,
    },
    amoy: {
      chainId: 80002,
      url: vars.get(
        "POLYGON_TESTNET_URL",
        "https://rpc-amoy.polygon.technology",
      ),
      accounts,
    },
    polygonZkEVMTestnet: {
      chainId: 2442,
      url: vars.get(
        "POLYGON_ZKEVM_TESTNET_URL",
        "https://rpc.cardona.zkevm-rpc.com",
      ),
      accounts,
    },
    polygon: {
      chainId: 137,
      url: vars.get("POLYGON_MAINNET_URL", "https://polygon-rpc.com"),
      accounts,
    },
    polygonZkEVMMain: {
      chainId: 1101,
      url: vars.get("POLYGON_ZKEVM_MAINNET_URL", "https://zkevm-rpc.com"),
      accounts,
    },
    hecoMain: {
      chainId: 128,
      url: vars.get("HECO_MAINNET_URL", "https://http-mainnet.hecochain.com"),
      accounts,
    },
    fantomTestnet: {
      chainId: 4002,
      url: vars.get("FANTOM_TESTNET_URL", "https://rpc.testnet.fantom.network"),
      accounts,
    },
    fantomMain: {
      chainId: 250,
      url: vars.get("FANTOM_MAINNET_URL", "https://rpc.ankr.com/fantom"),
      accounts,
    },
    fuji: {
      chainId: 43113,
      url: vars.get(
        "AVALANCHE_TESTNET_URL",
        "https://api.avax-test.network/ext/bc/C/rpc",
      ),
      accounts,
    },
    avalanche: {
      chainId: 43114,
      url: vars.get(
        "AVALANCHE_MAINNET_URL",
        "https://api.avax.network/ext/bc/C/rpc",
      ),
      accounts,
    },
    chiado: {
      chainId: 10200,
      url: vars.get("GNOSIS_TESTNET_URL", "https://rpc.chiadochain.net"),
      accounts,
    },
    gnosis: {
      chainId: 100,
      url: vars.get("GNOSIS_MAINNET_URL", "https://rpc.gnosischain.com"),
      accounts,
    },
    moonbaseAlpha: {
      chainId: 1287,
      url: vars.get(
        "MOONBEAM_TESTNET_URL",
        "https://rpc.api.moonbase.moonbeam.network",
      ),
      accounts,
    },
    moonriver: {
      chainId: 1285,
      url: vars.get(
        "MOONRIVER_MAINNET_URL",
        "https://moonriver.public.blastapi.io",
      ),
      accounts,
    },
    moonbeam: {
      chainId: 1284,
      url: vars.get(
        "MOONBEAM_MAINNET_URL",
        "https://moonbeam.public.blastapi.io",
      ),
      accounts,
    },
    alfajores: {
      chainId: 44787,
      url: vars.get(
        "CELO_TESTNET_URL",
        "https://alfajores-forno.celo-testnet.org",
      ),
      accounts,
    },
    celo: {
      chainId: 42220,
      url: vars.get("CELO_MAINNET_URL", "https://forno.celo.org"),
      accounts,
    },
    auroraTestnet: {
      chainId: 1313161555,
      url: vars.get("AURORA_TESTNET_URL", "https://testnet.aurora.dev"),
      accounts,
    },
    auroraMain: {
      chainId: 1313161554,
      url: vars.get("AURORA_MAINNET_URL", "https://mainnet.aurora.dev"),
      accounts,
    },
    harmonyTestnet: {
      chainId: 1666700000,
      url: vars.get("HARMONY_TESTNET_URL", "https://api.s0.b.hmny.io"),
      accounts,
    },
    harmonyMain: {
      chainId: 1666600000,
      url: vars.get("HARMONY_MAINNET_URL", "https://api.harmony.one"),
      accounts,
    },
    spark: {
      chainId: 123,
      url: vars.get("FUSE_TESTNET_URL", "https://rpc.fusespark.io"),
      accounts,
    },
    fuse: {
      chainId: 122,
      url: vars.get("FUSE_MAINNET_URL", "https://rpc.fuse.io"),
      accounts,
    },
    cronosTestnet: {
      chainId: 338,
      url: vars.get("CRONOS_TESTNET_URL", "https://evm-t3.cronos.org"),
      accounts,
    },
    cronosMain: {
      chainId: 25,
      url: vars.get("CRONOS_MAINNET_URL", "https://evm.cronos.org"),
      accounts,
    },
    evmosTestnet: {
      chainId: 9000,
      url: vars.get("EVMOS_TESTNET_URL", "https://evmos-testnet.lava.build"),
      accounts,
    },
    evmosMain: {
      chainId: 9001,
      url: vars.get("EVMOS_MAINNET_URL", "https://evmos.lava.build"),
      accounts,
    },
    bobaTestnet: {
      chainId: 2888,
      url: vars.get("BOBA_TESTNET_URL", "https://goerli.boba.network"),
      accounts,
    },
    bobaMain: {
      chainId: 288,
      url: vars.get("BOBA_MAINNET_URL", "https://replica.boba.network"),
      accounts,
    },
    cantoTestnet: {
      chainId: 7701,
      url: vars.get("CANTO_TESTNET_URL", "https://canto-testnet.plexnode.wtf"),
      accounts,
    },
    cantoMain: {
      chainId: 7700,
      url: vars.get("CANTO_MAINNET_URL", "https://canto.slingshot.finance"),
      accounts,
    },
    baseTestnet: {
      chainId: 84531,
      url: vars.get("BASE_TESTNET_URL", "https://goerli.base.org"),
      accounts,
    },
    baseSepolia: {
      chainId: 84532,
      url: vars.get("BASE_SEPOLIA_URL", "https://sepolia.base.org"),
      accounts,
    },
    baseMain: {
      chainId: 8453,
      url: vars.get("BASE_MAINNET_URL", "https://mainnet.base.org"),
      accounts,
    },
    mantleTestnet: {
      chainId: 5003,
      url: vars.get("MANTLE_TESTNET_URL", "https://rpc.sepolia.mantle.xyz"),
      accounts,
    },
    mantleMain: {
      chainId: 5000,
      url: vars.get("MANTLE_MAINNET_URL", "https://rpc.mantle.xyz"),
      accounts,
    },
    filecoinTestnet: {
      chainId: 314159,
      url: vars.get(
        "FILECOIN_TESTNET_URL",
        "https://rpc.ankr.com/filecoin_testnet",
      ),
      accounts,
    },
    filecoinMain: {
      chainId: 314,
      url: vars.get("FILECOIN_MAINNET_URL", "https://rpc.ankr.com/filecoin"),
      accounts,
    },
    scrollTestnet: {
      chainId: 534351,
      url: vars.get("SCROLL_TESTNET_URL", "https://sepolia-rpc.scroll.io"),
      accounts,
    },
    scrollMain: {
      chainId: 534352,
      url: vars.get("SCROLL_MAINNET_URL", "https://rpc.scroll.io"),
      accounts,
    },
    lineaTestnet: {
      chainId: 59141,
      url: vars.get("LINEA_TESTNET_URL", "https://rpc.sepolia.linea.build"),
      accounts,
    },
    lineaMain: {
      chainId: 59144,
      url: vars.get("LINEA_MAINNET_URL", "https://rpc.linea.build"),
      accounts,
    },
    shimmerEVMTestnet: {
      chainId: 1071,
      url: vars.get(
        "SHIMMEREVM_TESTNET_URL",
        "https://json-rpc.evm.testnet.shimmer.network",
      ),
      accounts,
    },
    zoraTestnet: {
      chainId: 999999999,
      url: vars.get("ZORA_TESTNET_URL", "https://sepolia.rpc.zora.energy"),
      accounts,
    },
    zoraMain: {
      chainId: 7777777,
      url: vars.get("ZORA_MAINNET_URL", "https://rpc.zora.energy"),
      accounts,
    },
    luksoTestnet: {
      chainId: 4201,
      url: vars.get("LUKSO_TESTNET_URL", "https://rpc.testnet.lukso.network"),
      accounts,
    },
    luksoMain: {
      chainId: 42,
      url: vars.get("LUKSO_MAINNET_URL", "https://rpc.lukso.gateway.fm"),
      accounts,
    },
    mantaTestnet: {
      chainId: 3441005,
      url: vars.get(
        "MANTA_TESTNET_URL",
        "https://pacific-rpc.testnet.manta.network/http",
      ),
      accounts,
    },
    mantaMain: {
      chainId: 169,
      url: vars.get(
        "MANTA_MAINNET_URL",
        "https://pacific-rpc.manta.network/http",
      ),
      accounts,
    },
    shardeumTestnet: {
      chainId: 8081,
      url: vars.get("SHARDEUM_TESTNET_URL", "https://dapps.shardeum.org"),
      accounts,
    },
    artheraTestnet: {
      chainId: 10243,
      url: vars.get("ARTHERA_TESTNET_URL", "https://rpc-test.arthera.net"),
      accounts,
    },
    frameTestnet: {
      chainId: 68840142,
      url: vars.get("FRAME_TESTNET_URL", "https://rpc.testnet.frame.xyz/http"),
      accounts,
    },
    enduranceTestnet: {
      chainId: 6480,
      url: vars.get(
        "ENDURANCE_TESTNET_URL",
        "https://myrpctestnet.fusionist.io",
      ),
      accounts,
    },
    openduranceTestnet: {
      chainId: 6480001001,
      url: vars.get(
        "OPENDURANCE_TESTNET_URL",
        "https://rpc-l2-testnet.fusionist.io",
      ),
      accounts,
    },
    enduranceMain: {
      chainId: 648,
      url: vars.get(
        "ENDURANCE_MAINNET_URL",
        "https://rpc-endurance.fusionist.io",
      ),
      accounts,
    },
    blastTestnet: {
      chainId: 168587773,
      url: vars.get("BLAST_TESTNET_URL", "https://sepolia.blast.io"),
      accounts,
    },
    blastMain: {
      chainId: 81457,
      url: vars.get("BLAST_MAINNET_URL", "https://rpc.blast.io"),
      accounts,
    },
    kromaTestnet: {
      chainId: 2358,
      url: vars.get("KROMA_TESTNET_URL", "https://api.sepolia.kroma.network"),
      accounts,
    },
    kromaMain: {
      chainId: 255,
      url: vars.get("KROMA_MAINNET_URL", "https://api.kroma.network"),
      accounts,
    },
    dosTestnet: {
      chainId: 3939,
      url: vars.get("DOS_TESTNET_URL", "https://test.doschain.com"),
      accounts,
    },
    dosMain: {
      chainId: 7979,
      url: vars.get("DOS_MAINNET_URL", "https://main.doschain.com"),
      accounts,
    },
    fraxtalTestnet: {
      chainId: 2522,
      url: vars.get("FRAXTAL_TESTNET_URL", "https://rpc.testnet.frax.com"),
      accounts,
    },
    fraxtalMain: {
      chainId: 252,
      url: vars.get("FRAXTAL_MAINNET_URL", "https://rpc.frax.com"),
      accounts,
    },
    kavaMain: {
      chainId: 2222,
      url: vars.get("KAVA_MAINNET_URL", "https://evm.kava-rpc.com"),
      accounts,
    },
    metisTestnet: {
      chainId: 59902,
      url: vars.get("METIS_TESTNET_URL", "https://sepolia.metisdevops.link"),
      accounts,
    },
    metisMain: {
      chainId: 1088,
      url: vars.get(
        "METIS_MAINNET_URL",
        "https://andromeda.metis.io/?owner=1088",
      ),
      accounts,
    },
    modeTestnet: {
      chainId: 919,
      url: vars.get("MODE_TESTNET_URL", "https://sepolia.mode.network"),
      accounts,
    },
    modeMain: {
      chainId: 34443,
      url: vars.get("MODE_MAINNET_URL", "https://mainnet.mode.network"),
      accounts,
    },
    seiTestnet: {
      chainId: 713715,
      url: vars.get("SEI_TESTNET_URL", "https://evm-rpc-arctic-1.sei-apis.com"),
      accounts,
    },
    xlayerTestnet: {
      chainId: 195,
      url: vars.get("XLAYER_TESTNET_URL", "https://testrpc.xlayer.tech"),
      accounts,
    },
    xlayerMain: {
      chainId: 196,
      url: vars.get("XLAYER_MAINNET_URL", "https://rpc.xlayer.tech"),
      accounts,
    },
    bobTestnet: {
      chainId: 111,
      url: vars.get("BOB_TESTNET_URL", "https://testnet.rpc.gobob.xyz"),
      accounts,
    },
    bobMain: {
      chainId: 60808,
      url: vars.get("BOB_MAINNET_URL", "https://rpc.gobob.xyz"),
      accounts,
    },
    coreTestnet: {
      chainId: 1115,
      url: vars.get("CORE_TESTNET_URL", "https://rpc.test.btcs.network"),
      accounts,
    },
    coreMain: {
      chainId: 1116,
      url: vars.get("CORE_MAINNET_URL", "https://rpc.coredao.org"),
      accounts,
    },
    telosTestnet: {
      chainId: 41,
      url: vars.get("TELOS_TESTNET_URL", "https://testnet.telos.net/evm"),
      accounts,
    },
    telosMain: {
      chainId: 40,
      url: vars.get("TELOS_MAINNET_URL", "https://mainnet.telos.net/evm"),
      accounts,
    },
    rootstockTestnet: {
      chainId: 31,
      url: vars.get(
        "ROOTSTOCK_TESTNET_URL",
        "https://public-node.testnet.rsk.co",
      ),
      accounts,
    },
    rootstockMain: {
      chainId: 30,
      url: vars.get("ROOTSTOCK_MAINNET_URL", "https://public-node.rsk.co"),
      accounts,
    },
    chilizTestnet: {
      chainId: 88882,
      url: vars.get("CHILIZ_TESTNET_URL", "https://spicy-rpc.chiliz.com"),
      accounts,
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
    strict: true,
    only: [],
    except: [],
  },
  gasReporter: {
    enabled: vars.has("REPORT_GAS") ? true : false,
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: [],
    spacing: 2,
    pretty: true,
  },
  sourcify: {
    // Enable Sourcify verification by default
    enabled: true,
    apiUrl: "https://sourcify.dev/server",
    browserUrl: "https://repo.sourcify.dev",
  },
  etherscan: {
    apiKey: {
      // For Ethereum testnets & mainnet
      mainnet: vars.get("ETHERSCAN_API_KEY", ""),
      goerli: vars.get("ETHERSCAN_API_KEY", ""),
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
      holesky: vars.get("ETHERSCAN_API_KEY", ""),
      // For BSC testnet & mainnet
      bsc: vars.get("BSC_API_KEY", ""),
      bscTestnet: vars.get("BSC_API_KEY", ""),
      // For Heco mainnet
      heco: vars.get("HECO_API_KEY", ""),
      // For Fantom testnet & mainnet
      opera: vars.get("FANTOM_API_KEY", ""),
      ftmTestnet: vars.get("FANTOM_API_KEY", ""),
      // For Optimism testnets & mainnet
      optimisticEthereum: vars.get("OPTIMISM_API_KEY", ""),
      optimisticGoerli: vars.get("OPTIMISM_API_KEY", ""),
      optimisticSepolia: vars.get("OPTIMISM_API_KEY", ""),
      // For Polygon testnets & mainnets
      polygon: vars.get("POLYGON_API_KEY", ""),
      polygonZkEVM: vars.get("POLYGON_ZKEVM_API_KEY", ""),
      polygonAmoy: vars.get("POLYGON_API_KEY", ""),
      polygonZkEVMTestnet: vars.get("POLYGON_ZKEVM_API_KEY", ""),
      // For Arbitrum testnet & mainnets
      arbitrumOne: vars.get("ARBITRUM_API_KEY", ""),
      arbitrumNova: vars.get("ARBITRUM_API_KEY", ""),
      arbitrumSepolia: vars.get("ARBITRUM_API_KEY", ""),
      // For Avalanche testnet & mainnet
      avalanche: vars.get("AVALANCHE_API_KEY", ""),
      avalancheFujiTestnet: vars.get("AVALANCHE_API_KEY", ""),
      // For Moonbeam testnet & mainnets
      moonbeam: vars.get("MOONBEAM_API_KEY", ""),
      moonriver: vars.get("MOONBEAM_API_KEY", ""),
      moonbaseAlpha: vars.get("MOONBEAM_API_KEY", ""),
      // For Celo testnet & mainnet
      celo: vars.get("CELO_API_KEY", ""),
      alfajores: vars.get("CELO_API_KEY", ""),
      // For Harmony testnet & mainnet
      harmony: vars.get("HARMONY_API_KEY", ""),
      harmonyTest: vars.get("HARMONY_API_KEY", ""),
      // For Aurora testnet & mainnet
      aurora: vars.get("AURORA_API_KEY", ""),
      auroraTestnet: vars.get("AURORA_API_KEY", ""),
      // For Cronos testnet & mainnet
      cronos: vars.get("CRONOS_API_KEY", ""),
      cronosTestnet: vars.get("CRONOS_API_KEY", ""),
      // For Gnosis/xDai testnet & mainnets
      gnosis: vars.get("GNOSIS_API_KEY", ""),
      xdai: vars.get("GNOSIS_API_KEY", ""),
      chiado: vars.get("GNOSIS_API_KEY", ""),
      // For Fuse testnet & mainnet
      fuse: vars.get("FUSE_API_KEY", ""),
      spark: vars.get("FUSE_API_KEY", ""),
      // For Evmos testnet & mainnet
      evmos: vars.get("EVMOS_API_KEY", ""),
      evmosTestnet: vars.get("EVMOS_API_KEY", ""),
      // For Boba network testnet & mainnet
      boba: vars.get("BOBA_API_KEY", ""),
      bobaTestnet: vars.get("BOBA_API_KEY", ""),
      // For Canto testnet & mainnet
      canto: vars.get("CANTO_API_KEY", ""),
      cantoTestnet: vars.get("CANTO_API_KEY", ""),
      // For Base testnets & mainnet
      base: vars.get("BASE_API_KEY", ""),
      baseTestnet: vars.get("BASE_API_KEY", ""),
      baseSepolia: vars.get("BASE_API_KEY", ""),
      // For Mantle testnet & mainnet
      mantle: vars.get("MANTLE_API_KEY", ""),
      mantleTestnet: vars.get("MANTLE_API_KEY", ""),
      // For Filecoin testnet & mainnet
      filecoin: vars.get("FILECOIN_API_KEY", ""),
      filecoinTestnet: vars.get("FILECOIN_API_KEY", ""),
      // For Scroll testnet & mainnet
      scroll: vars.get("SCROLL_API_KEY", ""),
      scrollTestnet: vars.get("SCROLL_API_KEY", ""),
      // For Linea testnet & mainnet
      linea: vars.get("LINEA_API_KEY", ""),
      lineaTestnet: vars.get("LINEA_API_KEY", ""),
      // For ShimmerEVM testnet
      shimmerEVMTestnet: vars.get("SHIMMEREVM_API_KEY", ""),
      // For Zora testnet & mainnet
      zora: vars.get("ZORA_API_KEY", ""),
      zoraTestnet: vars.get("ZORA_API_KEY", ""),
      // For Lukso testnet & mainnet
      lukso: vars.get("LUKSO_API_KEY", ""),
      luksoTestnet: vars.get("LUKSO_API_KEY", ""),
      // For Manta testnet & mainnet
      manta: vars.get("MANTA_API_KEY", ""),
      mantaTestnet: vars.get("MANTA_API_KEY", ""),
      // For Arthera testnet
      artheraTestnet: vars.get("ARTHERA_API_KEY", ""),
      // For Endurance testnets & mainnet
      endurance: vars.get("ENDURANCE_API_KEY", ""),
      enduranceTestnet: vars.get("ENDURANCE_API_KEY", ""),
      openduranceTestnet: vars.get("OPENDURANCE_API_KEY", ""),
      // For Blast testnet & mainnet
      blast: vars.get("BLAST_API_KEY", ""),
      blastTestnet: vars.get("BLAST_API_KEY", ""),
      // For Kroma testnet & mainnet
      kroma: vars.get("KROMA_API_KEY", ""),
      kromaTestnet: vars.get("KROMA_API_KEY", ""),
      // For DOS Chain testnet & mainnet
      dos: vars.get("DOS_API_KEY", ""),
      dosTestnet: vars.get("DOS_API_KEY", ""),
      // For Fraxtal testnet & mainnet
      fraxtal: vars.get("FRAXTAL_API_KEY", ""),
      fraxtalTestnet: vars.get("FRAXTAL_API_KEY", ""),
      // For Kava mainnet
      kava: vars.get("KAVA_API_KEY", ""),
      // For Metis testnet & mainnet
      metis: vars.get("METIS_API_KEY", ""),
      metisTestnet: vars.get("METIS_API_KEY", ""),
      // For Mode testnet & mainnet
      mode: vars.get("MODE_API_KEY", ""),
      modeTestnet: vars.get("MODE_API_KEY", ""),
      // For X Layer testnet & mainnet
      xlayer: vars.get("OKLINK_API_KEY", ""),
      xlayerTestnet: vars.get("OKLINK_API_KEY", ""),
      // For BOB testnet & mainnet
      bob: vars.get("BOB_API_KEY", ""),
      bobTestnet: vars.get("BOB_API_KEY", ""),
      // For Core testnet & mainnet
      core: vars.get("CORE_MAINNET_API_KEY", ""),
      coreTestnet: vars.get("CORE_TESTNET_API_KEY", ""),
      // For Telos testnet & mainnet
      telos: vars.get("TELOS_API_KEY", ""),
      telosTestnet: vars.get("TELOS_API_KEY", ""),
      // For Rootstock testnet & mainnet
      rootstock: vars.get("ROOTSTOCK_API_KEY", ""),
      rootstockTestnet: vars.get("ROOTSTOCK_API_KEY", ""),
      // For Chiliz testnet
      chilizTestnet: vars.get("CHILIZ_API_KEY", ""),
    },
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io",
        },
      },
      {
        network: "optimisticSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io",
        },
      },
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          apiURL: "https://gnosis-chiado.blockscout.com/api",
          browserURL: "https://gnosis-chiado.blockscout.com",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "cronos",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com",
        },
      },
      {
        network: "cronosTestnet",
        chainId: 338,
        urls: {
          apiURL: "https://cronos.org/explorer/testnet3/api",
          browserURL: "https://cronos.org/explorer/testnet3",
        },
      },
      {
        network: "fuse",
        chainId: 122,
        urls: {
          apiURL: "https://explorer.fuse.io/api",
          browserURL: "https://explorer.fuse.io",
        },
      },
      {
        network: "spark",
        chainId: 123,
        urls: {
          apiURL: "https://explorer.fusespark.io/api",
          browserURL: "https://explorer.fusespark.io",
        },
      },
      {
        network: "evmos",
        chainId: 9001,
        urls: {
          apiURL: "https://api.verify.mintscan.io/evm/api/0x2329",
          browserURL: "https://www.mintscan.io/evmos",
        },
      },
      {
        network: "evmosTestnet",
        chainId: 9000,
        urls: {
          apiURL: "https://api.verify.mintscan.io/evm/api/0x2328",
          browserURL: "https://www.mintscan.io/evmos-testnet",
        },
      },
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/288/etherscan",
          browserURL: "https://bobascan.com",
        },
      },
      {
        network: "bobaTestnet",
        chainId: 2888,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/2888/etherscan",
          browserURL: "https://testnet.bobascan.com",
        },
      },
      {
        network: "arbitrumNova",
        chainId: 42170,
        urls: {
          apiURL: "https://api-nova.arbiscan.io/api",
          browserURL: "https://nova.arbiscan.io",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
      {
        network: "canto",
        chainId: 7700,
        urls: {
          apiURL: "https://tuber.build/api",
          browserURL: "https://tuber.build",
        },
      },
      {
        network: "cantoTestnet",
        chainId: 7701,
        urls: {
          apiURL: "https://testnet.tuber.build/api",
          browserURL: "https://testnet.tuber.build",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "baseTestnet",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://explorer.mantle.xyz/api",
          browserURL: "https://explorer.mantle.xyz",
        },
      },
      {
        network: "mantleTestnet",
        chainId: 5003,
        urls: {
          apiURL: "https://explorer.sepolia.mantle.xyz/api",
          browserURL: "https://explorer.sepolia.mantle.xyz",
        },
      },
      {
        network: "filecoin",
        chainId: 314,
        urls: {
          apiURL: "https://filfox.info/api/v1/tools/verifyContract",
          browserURL: "https://filfox.info/en",
        },
      },
      {
        network: "filecoinTestnet",
        chainId: 314159,
        urls: {
          apiURL: "https://calibration.filfox.info/api/v1/tools/verifyContract",
          browserURL: "https://calibration.filfox.info/en",
        },
      },
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com",
        },
      },
      {
        network: "scrollTestnet",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com",
        },
      },
      {
        network: "polygonZkEVM",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com",
        },
      },
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: 2442,
        urls: {
          apiURL: "https://api-cardona-zkevm.polygonscan.com/api",
          browserURL: "https://cardona-zkevm.polygonscan.com",
        },
      },
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build",
        },
      },
      {
        network: "lineaTestnet",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build",
        },
      },
      {
        network: "shimmerEVMTestnet",
        chainId: 1071,
        urls: {
          apiURL: "https://explorer.evm.testnet.shimmer.network/api",
          browserURL: "https://explorer.evm.testnet.shimmer.network",
        },
      },
      {
        network: "zora",
        chainId: 7777777,
        urls: {
          apiURL: "https://explorer.zora.energy/api",
          browserURL: "https://explorer.zora.energy",
        },
      },
      {
        network: "zoraTestnet",
        chainId: 999999999,
        urls: {
          apiURL: "https://sepolia.explorer.zora.energy/api",
          browserURL: "https://sepolia.explorer.zora.energy",
        },
      },
      {
        network: "lukso",
        chainId: 42,
        urls: {
          apiURL: "https://explorer.execution.mainnet.lukso.network/api",
          browserURL: "https://explorer.execution.mainnet.lukso.network",
        },
      },
      {
        network: "luksoTestnet",
        chainId: 4201,
        urls: {
          apiURL: "https://explorer.execution.testnet.lukso.network/api",
          browserURL: "https://explorer.execution.testnet.lukso.network",
        },
      },
      {
        network: "manta",
        chainId: 169,
        urls: {
          apiURL: "https://pacific-explorer.manta.network/api",
          browserURL: "https://pacific-explorer.manta.network",
        },
      },
      {
        network: "mantaTestnet",
        chainId: 3441005,
        urls: {
          apiURL: "https://pacific-explorer.testnet.manta.network/api",
          browserURL: "https://pacific-explorer.testnet.manta.network",
        },
      },
      {
        network: "artheraTestnet",
        chainId: 10243,
        urls: {
          apiURL: "https://explorer-test.arthera.net/api",
          browserURL: "https://explorer-test.arthera.net",
        },
      },
      {
        network: "endurance",
        chainId: 648,
        urls: {
          apiURL: "https://explorer-endurance.fusionist.io/api",
          browserURL: "https://explorer-endurance.fusionist.io",
        },
      },
      {
        network: "enduranceTestnet",
        chainId: 6480,
        urls: {
          apiURL: "https://myexplorertestnet.fusionist.io/api",
          browserURL: "https://myexplorertestnet.fusionist.io",
        },
      },
      {
        network: "openduranceTestnet",
        chainId: 6480001001,
        urls: {
          apiURL: "https://explorer-l2-testnet.fusionist.io/api",
          browserURL: "https://explorer-l2-testnet.fusionist.io",
        },
      },
      {
        network: "blast",
        chainId: 81457,
        urls: {
          apiURL: "https://api.blastscan.io/api",
          browserURL: "https://blastscan.io",
        },
      },
      {
        network: "blastTestnet",
        chainId: 168587773,
        urls: {
          apiURL: "https://api-sepolia.blastscan.io/api",
          browserURL: "https://sepolia.blastscan.io",
        },
      },
      {
        network: "kroma",
        chainId: 255,
        urls: {
          apiURL: "https://api.kromascan.com/api",
          browserURL: "https://kromascan.com",
        },
      },
      {
        network: "kromaTestnet",
        chainId: 2358,
        urls: {
          apiURL: "https://api-sepolia.kromascan.com",
          browserURL: "https://sepolia.kromascan.com",
        },
      },
      {
        network: "dos",
        chainId: 7979,
        urls: {
          apiURL: "https://doscan.io/api",
          browserURL: "https://doscan.io",
        },
      },
      {
        network: "dosTestnet",
        chainId: 3939,
        urls: {
          apiURL: "https://test.doscan.io/api",
          browserURL: "https://test.doscan.io",
        },
      },
      {
        network: "fraxtal",
        chainId: 252,
        urls: {
          apiURL: "https://api.fraxscan.com/api",
          browserURL: "https://fraxscan.com",
        },
      },
      {
        network: "fraxtalTestnet",
        chainId: 2522,
        urls: {
          apiURL: "https://api-holesky.fraxscan.com/api",
          browserURL: "https://holesky.fraxscan.com",
        },
      },
      {
        network: "kava",
        chainId: 2222,
        urls: {
          apiURL: "https://kavascan.com/api",
          browserURL: "https://kavascan.com",
        },
      },
      {
        network: "metis",
        chainId: 1088,
        urls: {
          apiURL: "https://andromeda-explorer.metis.io/api",
          browserURL: "https://andromeda-explorer.metis.io",
        },
      },
      {
        network: "metisTestnet",
        chainId: 59902,
        urls: {
          apiURL: "https://sepolia-explorer.metisdevops.link/api",
          browserURL: "https://sepolia-explorer.metisdevops.link",
        },
      },
      {
        network: "mode",
        chainId: 34443,
        urls: {
          apiURL: "https://explorer.mode.network/api",
          browserURL: "https://explorer.mode.network",
        },
      },
      {
        network: "modeTestnet",
        chainId: 919,
        urls: {
          apiURL: "https://sepolia.explorer.mode.network/api",
          browserURL: "https://sepolia.explorer.mode.network",
        },
      },
      {
        network: "xlayer",
        chainId: 196,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER",
          browserURL: "https://www.oklink.com/xlayer",
        },
      },
      {
        network: "xlayerTestnet",
        chainId: 195,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET",
          browserURL: "https://www.oklink.com/xlayer-test",
        },
      },
      {
        network: "bob",
        chainId: 60808,
        urls: {
          apiURL: "https://explorer.gobob.xyz/api",
          browserURL: "https://explorer.gobob.xyz",
        },
      },
      {
        network: "bobTestnet",
        chainId: 111,
        urls: {
          apiURL: "https://testnet-explorer.gobob.xyz/api",
          browserURL: "https://testnet-explorer.gobob.xyz",
        },
      },
      {
        network: "core",
        chainId: 1116,
        urls: {
          apiURL: "https://openapi.coredao.org/api",
          browserURL: "https://scan.coredao.org",
        },
      },
      {
        network: "coreTestnet",
        chainId: 1115,
        urls: {
          apiURL: "https://api.test.btcs.network/api",
          browserURL: "https://scan.test.btcs.network",
        },
      },
      {
        network: "telos",
        chainId: 40,
        urls: {
          apiURL: "https://api.teloscan.io/api",
          browserURL: "https://www.teloscan.io",
        },
      },
      {
        network: "telosTestnet",
        chainId: 41,
        urls: {
          apiURL: "https://api.testnet.teloscan.io/api",
          browserURL: "https://testnet.teloscan.io",
        },
      },
      {
        network: "rootstock",
        chainId: 30,
        urls: {
          apiURL: "https://rootstock.blockscout.com/api",
          browserURL: "https://rootstock.blockscout.com",
        },
      },
      {
        network: "rootstockTestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api",
          browserURL: "https://rootstock-testnet.blockscout.com",
        },
      },
      {
        network: "chilizTestnet",
        chainId: 88882,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan/api",
          browserURL: "https://testnet.chiliscan.com",
        },
      },
    ],
  },
};

export default config;
